package com.ssafy.a303.backend.common.utility.s3.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum S3ErrorCode implements ErrorCode {
    UNKNOWN_ERROR(500, "S3와 통신하는 과정에 에러가 발생했습니다.");

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
