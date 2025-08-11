package com.ssafy.a303.backend.photo.dto;

import java.util.List;

public record UpdatePhotoWordCommandDto(
    Long userId,
    Long wordId,
    String imageKey,
    List<Long> folders
) {}