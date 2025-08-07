package com.ssafy.a303.backend.quiz.dto;

import java.time.LocalDateTime;

public record UpdateTodayQuizCommandDto(
        Long userId,
        Integer quizNumber,
        LocalDateTime currentTime
) {}