package com.ssafy.a303.backend.photo.dto;

public record ReadObjectDetectionResultDto(
    String nameEn,
    String nameKo,
    String redisImageKey,
    Long wordId
) {}