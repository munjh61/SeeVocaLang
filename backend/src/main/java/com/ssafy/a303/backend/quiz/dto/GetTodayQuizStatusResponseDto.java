package com.ssafy.a303.backend.quiz.dto;

public record GetTodayQuizStatusResponseDto(
    int lastSolvedNumber,
    int totalProblemCount
){}