package com.ssafy.a303.backend.word.dto;

import com.ssafy.a303.backend.user.entity.UserEntity;

public record CreateWordCommandDto(
        String nameEn,
        String nameKo,
        String imageUrl,
        UserEntity user
) {}