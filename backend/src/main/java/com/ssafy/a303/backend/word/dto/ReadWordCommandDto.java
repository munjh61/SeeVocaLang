package com.ssafy.a303.backend.word.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadWordCommandDto {
    private int size;
    private long lastId;
    private long userId;
}
