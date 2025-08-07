package com.ssafy.a303.backend.word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardGamePhotoDto {
    private String s3ImageUrl;
    private String eng;
    private String audio;
}
