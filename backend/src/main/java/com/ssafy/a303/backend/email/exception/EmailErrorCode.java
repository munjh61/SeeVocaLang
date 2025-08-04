package com.ssafy.a303.backend.email.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EmailErrorCode implements ErrorCode {

    EMAIL_SEND_FAILED(500, "이메일 전송에 실패했습니다"),
    INVALID_VERIFICATION_CODE(400, "인증 코드가 일치하지 않습니다"),
    ALREADY_VERIFIED(409, "이미 인증된 이메일입니다.");

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
