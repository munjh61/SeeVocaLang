package com.ssafy.a303.backend.user.dto;

public record UserMonthlyStatsDto(
        long totalDaysCount,
        long streakDaysCount,
        long monthDaysCount,
        long totalWordsCount,
        long totalFoldersCount
) {}