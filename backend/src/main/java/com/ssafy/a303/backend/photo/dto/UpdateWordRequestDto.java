package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record UpdateWordRequestDto(
        @JsonProperty("image_key") String imageKey
) {}