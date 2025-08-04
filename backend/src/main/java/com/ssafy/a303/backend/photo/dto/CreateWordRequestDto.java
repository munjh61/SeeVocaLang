package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateWordRequestDto(
        @JsonProperty("name_en")    String nameEn,
        @JsonProperty("name_ko")    String nameKo,
        @JsonProperty("image_key")  String imageKey,
        @JsonProperty("folder_id")  Long   folderId
) {}