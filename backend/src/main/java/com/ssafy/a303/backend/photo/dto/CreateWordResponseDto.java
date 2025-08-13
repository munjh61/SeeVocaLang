package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record CreateWordResponseDto(
        @JsonProperty("word_id")
        Long wordId,

        @JsonProperty("name_en")
        String nameEn,

        @JsonProperty("name_ko")
        String nameKo,

        @JsonProperty("image_url")
        String imageUrl,

        List<CreateWordFolderItemDto> folders
) {}