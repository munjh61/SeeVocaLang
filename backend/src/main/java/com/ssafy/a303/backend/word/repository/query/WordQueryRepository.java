package com.ssafy.a303.backend.word.repository.query;

import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.entity.WordEntity;

import java.util.List;

public interface WordQueryRepository {
    List<ReadWordResponseDto> getWords(long userId);
    List<WordEntity> getWordsByFolderId(Long folderId);
}
