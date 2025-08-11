package com.ssafy.a303.backend.user.dto;

public record GetStatisticsResponseDto(
        long totalDaysCount,
        long streakDaysCount,
        long monthDaysCount,
        long totalWordsCount,
        long totalFoldersCount
) {}