package com.ssafy.a303.backend.quiz.mapper;

import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResponseDto;
import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResultDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface QuizMapper {
    QuizMapper INSTANCE = Mappers.getMapper(QuizMapper.class);

    GetTodayQuizStatusResponseDto toGetTodayQuizStatusResponseDto(GetTodayQuizStatusResultDto getTodayQuizStatusResultDto);
}
