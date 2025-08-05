package com.ssafy.a303.backend.quiz.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GetTodayQuizStatusResponseDto(
        @JsonProperty("last_solved_number")
        int lastSolvedNumber,

        @JsonProperty("total_problem_count")
        int totalProblemCount
) {}