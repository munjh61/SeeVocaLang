package com.ssafy.a303.backend.email.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class EmailVerificationException extends SVLRuntimeException {
    public EmailVerificationException(ErrorCode errorCode) {
        super(errorCode);
    }
}
