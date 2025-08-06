package com.ssafy.a303.backend.word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CardGameResponseDto {
    private List<CardGamePhotoDto> photos;
}
