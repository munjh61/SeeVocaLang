package com.ssafy.a303.backend.photo.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record CreateWordResultDto(
        Long wordId,
        String nameEn,
        String nameKo,
        String imageUrl,
        List<CreateWordFolderItemDto> folders
) {}