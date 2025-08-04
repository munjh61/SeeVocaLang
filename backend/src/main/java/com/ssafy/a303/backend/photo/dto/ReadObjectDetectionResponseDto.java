package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReadObjectDetectionResponseDto(
    @JsonProperty("name_en") String nameEn,
    @JsonProperty("name_ko") String nameKo,
    @JsonProperty("image_key") String redisImageKey,
    @JsonProperty("word_id") Long wordId
) {}