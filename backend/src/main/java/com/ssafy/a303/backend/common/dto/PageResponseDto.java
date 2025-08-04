package com.ssafy.a303.backend.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PageResponseDto<T> {
    private List<T> content;
    private boolean hasNext;
    private long lastId;
    private String message;
}
