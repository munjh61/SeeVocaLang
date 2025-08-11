package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record UpdateWordRequestDto(
        @JsonProperty("image_key") String imageKey,
        List<Long> folders
) {}