package com.ssafy.a303.backend.word.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadWordResponseDto {
    private long wordId;
    private String imageUrl;
    private String audioUrl;
    private String nameKo;
    private String nameEn;
}
