package com.ssafy.a303.backend.user.dto;

public record GetStatisticsResponseDto(
        int totalDaysCount,
        int streakDaysCount,
        int monthDaysCount,
        int totalWordsCount,
        int totalFoldersCount
) {}