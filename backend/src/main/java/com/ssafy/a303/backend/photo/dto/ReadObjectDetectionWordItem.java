package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReadObjectDetectionWordItem(
        @JsonProperty("word_id") long wordId,
        @JsonProperty("image_url") String imageUrl
) {}