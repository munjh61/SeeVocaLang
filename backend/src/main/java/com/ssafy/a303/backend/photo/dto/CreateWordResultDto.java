package com.ssafy.a303.backend.photo.dto;

public record CreateWordResultDto(
        Long wordId,
        String nameEn,
        String nameKo,
        String imageUrl
) {}