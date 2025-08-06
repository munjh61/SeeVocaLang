package com.ssafy.a303.backend.quiz.dto;

public record GetTodayQuizStatusResultDto(
        int lastSolvedNumber,
        int totalProblemCount
) {}