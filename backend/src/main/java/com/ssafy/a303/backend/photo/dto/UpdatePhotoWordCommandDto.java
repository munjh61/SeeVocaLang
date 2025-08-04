package com.ssafy.a303.backend.photo.dto;

public record UpdatePhotoWordCommandDto(
    Long userId,
    Long wordId,
    String imageKey
) {}