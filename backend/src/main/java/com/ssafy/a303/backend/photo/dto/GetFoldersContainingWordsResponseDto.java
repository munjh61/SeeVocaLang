package com.ssafy.a303.backend.photo.dto;

import java.util.List;

public record GetFoldersContainingWordsResponseDto(
        List<GetFoldersContainingWordsItemDto> folders
) {}
