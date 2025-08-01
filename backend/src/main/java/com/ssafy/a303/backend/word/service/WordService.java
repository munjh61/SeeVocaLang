package com.ssafy.a303.backend.word.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.word.dto.*;
import com.ssafy.a303.backend.word.entity.WordEntity;
import com.ssafy.a303.backend.word.exception.WordNotFoundException;
import com.ssafy.a303.backend.word.mapper.WordMapper;
import com.ssafy.a303.backend.word.repository.WordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        return wordRepository.existsByWordIdAndUserId(name, userId);
    }

    public boolean getWordExistence(Long wordId) {
        return wordRepository.existsById(wordId);
    }

    public Long getWordId(Long userId, String nameEn) {
        return wordRepository
                .findByUserUserIdAndNameEn(userId, nameEn)
                .map(WordEntity::getWordId)
                .orElse(null);
    }

    public void createWord(CreateWordCommandDto comandDto) {
        WordEntity wordEntity = WordEntity.builder()
                .user(comandDto.user())
                .nameEn(comandDto.nameEn())
                .nameKo(comandDto.nameKo())
                .imageUrl(comandDto.imageUrl())
                .build();

        wordRepository.save(wordEntity);
    }

    public void updateWord(Long wordId, String imageUrl) {

    }
}
