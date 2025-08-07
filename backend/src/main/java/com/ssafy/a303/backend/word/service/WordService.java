package com.ssafy.a303.backend.word.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.word.dto.*;
import com.ssafy.a303.backend.word.entity.WordEntity;
import com.ssafy.a303.backend.word.exception.CardGameErrorCode;
import com.ssafy.a303.backend.word.exception.CardGameException;
import com.ssafy.a303.backend.word.exception.WordNotAccessibleRuntimeException;
import com.ssafy.a303.backend.word.exception.WordNotFoundException;
import com.ssafy.a303.backend.word.mapper.WordMapper;
import com.ssafy.a303.backend.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.smartcardio.CardException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WordService {
    private final WordRepository wordRepository;

    @Transactional(readOnly = true)
    public PageResponseDto<ReadWordResponseDto> getWords(ReadWordCommandDto readWordCommandDto) {
        long lastId = readWordCommandDto.getLastId();
        int size = readWordCommandDto.getSize();
        long userId = readWordCommandDto.getUserId();

        PageRequest pageable = PageRequest.of(0, size);

        Page<WordEntity> pages;
        if (lastId == -1)
            pages = wordRepository.findByUserUserIdOrderByWordIdDesc(userId, pageable);
        else
            pages = wordRepository.findByUserUserIdAndWordIdLessThanOrderByWordIdDesc(userId, lastId, pageable);

        List<ReadWordResponseDto> words = pages
                .getContent()
                .stream()
                .map(WordMapper.INSTANCE::readWordCommandDto)
                .toList();

        long id = words.isEmpty() ? -1 : words.get(words.size() - 1).getWordId();

        return PageResponseDto.<ReadWordResponseDto>builder()
                .message("전체 사진을 성공적으로 불러왔습니다.")
                .content(words)
                .hasNext(pages.hasNext())
                .lastId(id)
                .build();
    }

    @Transactional
    public BaseResponseDto<Void> deleteWord(DeleteWordCommandDto deleteWordCommandDto) {
        WordEntity word = wordRepository.findByUserUserIdAndWordId(deleteWordCommandDto.getUserId(),
                        deleteWordCommandDto.getWordId())
                .orElseThrow(() -> new WordNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        word.delete();

        return BaseResponseDto.<Void>builder()
                .message("단어가 성공적으로 삭제되었습니다.")
                .build();
    }

    public boolean getWordExistence(String name, Long userId) {
        return wordRepository.existsByNameEnAndUserUserId(name, userId);
    }

    public Long getWordId(Long userId, String nameEn) {
        return wordRepository
                .findByUserUserIdAndNameEn(userId, nameEn)
                .map(WordEntity::getWordId)
                .orElse(null);
    }

    public WordEntity createWord(CreateWordCommandDto comandDto) {
        WordEntity wordEntity = WordEntity.builder()
                .user(comandDto.user())
                .nameEn(comandDto.nameEn())
                .nameKo(comandDto.nameKo())
                .imageUrl(comandDto.imageUrl())
                .build();

        return wordRepository.save(wordEntity);
    }

    public void updateWord(Long wordId, Long userId, String imageUrl) {
        WordEntity word = wordRepository.findById(wordId)
                .orElseThrow(() -> new WordNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        if (!userId.equals(word.getUser().getUserId()))
            throw new WordNotAccessibleRuntimeException(CommonErrorCode.FORBIDDEN_REQUEST);

        word.updateImageUrl(imageUrl);
        wordRepository.save(word);
    }

    @Transactional(readOnly = true)
    public CardGameResponseDto getCardGameWords(Long userId){
        List<WordEntity> words = wordRepository.findByUserUserId(userId);

        if(words.size() < 4) {
            throw new CardGameException(CardGameErrorCode.NOT_ENOUGH_WORDS);
        }

        Collections.shuffle(words);

        List<WordEntity> selected = words.subList(0, 4);

        List<CardGamePhotoDto> dtoList = selected.stream()
                .map(WordMapper.INSTANCE::toCardGamePhotoDto)
                .toList();

        return new CardGameResponseDto(dtoList);
    }
}
