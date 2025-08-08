package com.ssafy.a303.backend.user.repository.query;

import com.ssafy.a303.backend.user.dto.UserMonthlyStatsDto;

import java.time.LocalDateTime;

public interface UserQueryRepository {

    public UserMonthlyStatsDto findUserMonthlyStats(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    );
}
