package com.ssafy.a303.backend.word.dto;

public record UpdateWordCommandDto(
    Long wordId,
    String imageUrl
) {}
