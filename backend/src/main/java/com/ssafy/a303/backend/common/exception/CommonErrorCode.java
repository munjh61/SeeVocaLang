package com.ssafy.a303.backend.common.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    INVALID_INPUT(400, "입력값이 올바르지 않습니다."),
    AUTHORIZATION_REQUIRED(401, "인증이 필요합니다."),
    FORBIDDEN_REQUEST(403, "권한이 불충분합니다."),
    RESOURCE_ALREADY_EXIST(409, "이미 존재하는 리소스입니다.");

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
