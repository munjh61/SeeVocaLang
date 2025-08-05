package com.ssafy.a303.backend.quiz.dto;

import java.util.List;

public record GetTodayQuizResponseDto(
        Long userId,
        List<GetTodayQuizItem> words
) {}