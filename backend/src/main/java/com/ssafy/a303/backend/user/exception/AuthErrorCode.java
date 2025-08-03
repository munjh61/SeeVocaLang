package com.ssafy.a303.backend.user.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
public enum AuthErrorCode implements ErrorCode {

    REFRESH_TOKEN_NOT_PROVIDED(400, "Refresh Token이 제공되지 않았습니다."),
    REFRESH_TOKEN_INVALID(401, "Refresh Token이 유효하지 않습니다."),
    REFRESH_TOKEN_EXPIRED_OR_NOT_FOUND(409, "Refresh Token이 만료되었거나 유효하지 않습니다.");

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
