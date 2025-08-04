package com.ssafy.a303.backend.common.exception;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum AuthErrorCode implements ErrorCode {
    // JWT 관련
    INVALID_SECRET_KEY(500, "jwt.secret 길이는 32바이트 이상이어야 합니다"),
    TOKEN_EXPIRED(401, "토큰이 만료되었습니다."),
    TOKEN_INVALID(401, "유효하지 않은 토큰입니다."),
    TOKEN_MALFORMED(401, "토큰 형식이 올바르지 않습니다."),
    
    // Refresh Token 관련
    REFRESH_TOKEN_NOT_PROVIDED(400, "Refresh Token이 제공되지 않았습니다."),
    REFRESH_TOKEN_EXPIRED_OR_NOT_FOUND(401, "Refresh Token이 만료되었거나 유효하지 않습니다."),
    REFRESH_TOKEN_MISMATCH(401, "Refresh Token이 일치하지 않습니다."),
    
    // Access Token 관련
    ACCESS_TOKEN_NOT_PROVIDED(400, "Access Token이 제공되지 않았습니다."),
    ACCESS_TOKEN_INVALID(401, "Access Token이 유효하지 않습니다."),
    ACCESS_TOKEN_EXPIRED(401, "Access Token이 만료되었습니다.");

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