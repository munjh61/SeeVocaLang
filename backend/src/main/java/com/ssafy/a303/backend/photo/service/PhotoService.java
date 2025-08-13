package com.ssafy.a303.backend.photo.service;

import com.ssafy.a303.backend.common.entity.SVLWord;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.utility.redis.RedisWordImageHelper;
import com.ssafy.a303.backend.common.utility.redis.RedisWordImage;
import com.ssafy.a303.backend.common.utility.s3.ImageUploader;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.service.FolderService;
import com.ssafy.a303.backend.folderword.service.FolderWordService;
import com.ssafy.a303.backend.photo.dto.*;
import com.ssafy.a303.backend.photo.mapper.PhotoMapper;
import com.ssafy.a303.backend.photo.utils.AIServerClient;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.service.UserService;
import com.ssafy.a303.backend.word.dto.CreateWordCommandDto;
import com.ssafy.a303.backend.word.entity.WordEntity;
import com.ssafy.a303.backend.word.exception.WordAlreadExistException;
import com.ssafy.a303.backend.word.exception.WordNotFoundException;
import com.ssafy.a303.backend.word.service.WordService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhotoService {

    private final ImageUploader imageUploader;
    private final RedisWordImageHelper redisWordImageHelper;
    private final AIServerClient aiServerClient;

    private final WordService wordService;
    private final FolderWordService folderWordService;
    private final FolderService folderService;
    private final UserService userService;

    public ReadObjectDetectionResultDto readObjectDetection(ReadObjectDetectionCommandDto command) {
        Long userId = command.userId();
        // TODO: replaceAll 메서드는 Fast-api return 문자열 값의 오류로, ai서버 재배포 후 삭제될 예정입니다.
        String nameEn = aiServerClient.readObjectResult(command.imageFile()).replaceAll("^\"+|\"+$", "");
        if (nameEn.equals("glass")) nameEn = "glasses";
        String nameKo = SVLWord.translateToKorean(nameEn, "인식 불가");
        String imageKey = redisWordImageHelper.upsertImage(command.imageFile(),  userId, nameEn);
        Optional<WordEntity> word = wordService.getWordByNameEn(nameEn, userId);
        ReadObjectDetectionWordItem wordItem = word
                .map(w -> new ReadObjectDetectionWordItem(w.getWordId(), w.getImageUrl()))
                .orElse(null);

        return new ReadObjectDetectionResultDto(nameEn, nameKo, imageKey, wordItem);
    }

    @Transactional
    public CreateWordResultDto createWord(CreateWordPhotoCommandDto commandDto) {
        Long userId = commandDto.userId();
        if (wordService.getWordExistence(commandDto.nameEn(), userId))
            throw new WordAlreadExistException(CommonErrorCode.RESOURCE_ALREADY_EXIST);

        String word = commandDto.nameEn();
        RedisWordImage image = redisWordImageHelper.getImage(commandDto.imageKey());
        String imageUrl = imageUploader.upsert(userId, word, image.getContent(), image.getContentType());
        UserEntity userEntity = userService.getUser(userId)
                .orElseThrow(() -> new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        CreateWordCommandDto createWordCommandDto = new CreateWordCommandDto(commandDto.nameEn(), commandDto.nameKo(), imageUrl, userEntity);
        WordEntity wordEntity = wordService.createWord(createWordCommandDto);
        FolderEntity folderEntity = folderService.getFolderById(commandDto.folderId());
        folderWordService.saveWordInFolder(wordEntity, folderEntity);

        redisWordImageHelper.deleteImage(userId, word);
        return PhotoMapper.INSTANCE.toResultDto(wordEntity);
    }

    @Transactional
    public void updateWordImage(UpdateWordImageCommandDto commandDto) {
        Long userId = commandDto.userId();
        Long wordId = commandDto.wordId();
        WordEntity word = wordService.getWordByWordId(wordId);
        String imageKey = commandDto.imageKey();
        RedisWordImage image = redisWordImageHelper.getImage(imageKey);
        String imageUrl = imageUploader.upsert(userId, word.getNameEn(), image.getContent(), image.getContentType());
        wordService.updateWord(wordId, userId, imageUrl);
    }

    @Transactional
    public void updateWord(UpdatePhotoWordCommandDto commandDto) {
        Long userId = commandDto.userId();
        Long wordId = commandDto.wordId();
        RedisWordImage image = redisWordImageHelper.getImage(commandDto.imageKey());
        String word = image.getNameEn();
        String imageUrl = imageUploader.upsert(userId, word, image.getContent(), image.getContentType());

        wordService.updateWord(wordId, userId, imageUrl);
        for (Long folderId: commandDto.folders()) {
            FolderEntity folderEntity = folderService.getFolderById(folderId);
            WordEntity wordEntity = wordService.getWordByWordId(wordId);
            folderWordService.saveWordInFolder(wordEntity, folderEntity);
            redisWordImageHelper.deleteImage(userId, word);
        }
    }

    public List<GetFoldersContainingWordsItemDto> getFoldersContainingWordsList(Long userId, Long wordId) {
        if (!wordService.getWordExistence(wordId, userId))
            throw new WordNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND);

        return folderService.getFoldersContainingWordsList(userId, wordId);
    }

}
