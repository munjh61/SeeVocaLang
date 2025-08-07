package com.ssafy.a303.backend.word.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
public enum CardGameErrorCode implements ErrorCode {
    NOT_ENOUGH_WORDS(400, "단어장에 저장된 단어가 4개 이상 필요합니다");

    private final int statusCode;
    private final String message;

    @Override
    public int getStatusCode() {
        return this.statusCode;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
