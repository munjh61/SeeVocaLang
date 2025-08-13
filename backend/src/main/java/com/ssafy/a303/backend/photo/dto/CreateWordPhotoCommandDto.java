package com.ssafy.a303.backend.photo.dto;

import java.util.List;

public record CreateWordPhotoCommandDto(
        String nameEn,
        String nameKo,
        String imageKey,
        List<Long> folders,
        Long   userId
) { }