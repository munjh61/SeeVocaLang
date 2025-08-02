package com.ssafy.a303.backend.sociallogin.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum SocialLoginErrorCode implements ErrorCode {
    UNSUPPORTED_OAUTH_PROVIDER(400, "지원하지 않는 소셜 로그인 방식입니다."),
    SOCIAL_LOGIN_FAILED(401, "소셜 로그인에 실패했습니다"),
    DUPLICATED_SOCIAL_LOGIN(409, "이미 연동된 소셜 계정입니다"),
    NO_REMAINING_LOGIN_METHOD(400, "유일한 로그인 수단은 연동 해제할 수 없습니다");

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
