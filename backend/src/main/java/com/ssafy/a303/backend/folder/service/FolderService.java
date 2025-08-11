package com.ssafy.a303.backend.folder.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.folder.dto.*;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.exception.FolderNotFoundException;
import com.ssafy.a303.backend.folder.mapper.FolderMapper;
import com.ssafy.a303.backend.folder.repository.FolderRepository;
import com.ssafy.a303.backend.photo.dto.GetFoldersContainingWordsItemDto;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.service.UserService;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final FolderRepository folderRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public PageResponseDto<ReadFoldersResponseDto> getFolders(ReadFoldersCommandDto readFoldersCommandDto) {
        List<ReadFoldersResponseDto> folders = folderRepository.findAllByUserId(readFoldersCommandDto.getUserId(), false);

        boolean hasNext = folders.size() > readFoldersCommandDto.getSize();

        if (hasNext) {
            folders = folders.subList(0, readFoldersCommandDto.getSize());
        }

        return PageResponseDto.<ReadFoldersResponseDto>builder()
                .message("성공적으로 단어장을 불러왔습니다.")
                .content(folders)
                .hasNext(hasNext)
                .build();
    }

    public BaseResponseDto<Long> createFolder(CreateFolderCommandDto createFolderCommandDto) {
        UserEntity user = userService.getUser(createFolderCommandDto.getUserId())
                .orElseThrow(() -> new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));
        FolderEntity folder = FolderMapper.INSTANCE.toEntity(createFolderCommandDto, user);

        long folderId = folderRepository.save(folder).getFolderId();
        return BaseResponseDto.<Long>builder()
                .message("성공적으로 폴더를 생성했습니다.")
                .content(folderId)
                .build();
    }

    @Transactional
    public BaseResponseDto<Void> deleteFolder(DeleteFolderCommandDto deleteFolderCommandDto) {
        FolderEntity folder = folderRepository.findById(deleteFolderCommandDto.getFolderId())
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        folder.delete();

        return BaseResponseDto.<Void>builder()
                .message("폴더를 성공적으로 삭제했습니다.")
                .build();
    }

    @Transactional
    public BaseResponseDto<Void> updateFolder(UpdateFolderCommandDto updateFolderCommandDto) {
        FolderEntity folder = folderRepository.findById(updateFolderCommandDto.getFolderId())
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        folder.update(updateFolderCommandDto.getDescription(), updateFolderCommandDto.getName());

        return BaseResponseDto.<Void>builder().message("성공적으로 단어장을 수정했습니다.").build();
    }

    @Transactional(readOnly = true)
    public PageResponseDto<ReadWordResponseDto> getWordsByFolderId(ReadFolderWordCommandDto readFolderWordCommandDto) {
        List<ReadWordResponseDto> words = folderRepository.getWordsByFolderId(readFolderWordCommandDto.getFolderId());
        
        return PageResponseDto.<ReadWordResponseDto>builder()
                .message("성공적으로 단어장을 불러왔습니다.")
                .content(words)
                .build();
    }

    public BaseResponseDto<Void> deleteFolderWords(DeleteFolderWordsCommandDto deleteFolderWordsCommandDto) {
        folderRepository.deleteWordsByFolderId(deleteFolderWordsCommandDto.getFolderId(),
                deleteFolderWordsCommandDto.getWordIds());

        return BaseResponseDto.<Void>builder()
                .message("성공적으로 단어들을 단어장에서 삭제했습니다.")
                .build();
    }

    public FolderEntity getFolderById(long folderId) {
        return folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }

    public PageResponseDto<ReadFoldersResponseDto> getFavorites(long userId) {
        List<ReadFoldersResponseDto> folders = folderRepository.findAllByUserId(userId, true);

        return PageResponseDto.<ReadFoldersResponseDto>builder()
                .content(folders)
                .build();
    }

    public BaseResponseDto<Void> updateFavorite(long folderId, boolean favorite) {
        FolderEntity folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        folder.setFavorite(favorite);

        return BaseResponseDto.<Void>builder()
                .message("성공적으로 즐겨 찾기를 수정했습니다.")
                .build();
    }

    public List<GetFoldersContainingWordsItemDto> getFoldersContainingWordsList(Long userId, Long wordId) {
        return folderRepository.getFoldersContainingWordsList(userId, wordId);
    }
}
