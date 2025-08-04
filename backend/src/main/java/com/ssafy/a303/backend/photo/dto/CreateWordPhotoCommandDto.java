package com.ssafy.a303.backend.photo.dto;

public record CreateWordPhotoCommandDto(
        String nameEn,
        String nameKo,
        String imageKey,
        Long   folderId,
        Long   userId
) { }