package com.ssafy.a303.backend.word.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardGamePhotoDto {
    private String s3ImageUrl;
    private String eng;
    private String audio;
}
