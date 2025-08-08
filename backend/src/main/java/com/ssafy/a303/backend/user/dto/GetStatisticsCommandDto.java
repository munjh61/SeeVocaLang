package com.ssafy.a303.backend.user.dto;

import java.time.LocalDateTime;

public record GetStatisticsCommandDto(
        Long userId,
        LocalDateTime startTime,
        LocalDateTime endTime
) {}