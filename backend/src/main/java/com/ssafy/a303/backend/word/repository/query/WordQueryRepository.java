package com.ssafy.a303.backend.word.repository.query;

import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;

import java.util.List;

public interface WordQueryRepository {
    List<ReadWordResponseDto> getWords(long userId);
}
