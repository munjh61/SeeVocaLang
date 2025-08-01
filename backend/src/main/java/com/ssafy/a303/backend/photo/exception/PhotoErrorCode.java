package com.ssafy.a303.backend.photo.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PhotoErrorCode implements ErrorCode {
    PHOTO_NOT_READABLE(400, "업로드한 이미지를 읽어올 수 없습니다.");

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
