package com.ssafy.a303.backend.studyhistory.dto;

public record GetStudyDaysCommandDto(
        Long userId,
        int year,
        int month
) {}