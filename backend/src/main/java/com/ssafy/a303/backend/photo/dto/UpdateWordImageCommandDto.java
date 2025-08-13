package com.ssafy.a303.backend.photo.dto;

public record UpdateWordImageCommandDto(
        Long wordId,
        Long userId,
        String imageKey
) {}