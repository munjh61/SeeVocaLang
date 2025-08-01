package com.ssafy.a303.backend.user.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class InvalidCredentialsException extends SVLRuntimeException {
    public InvalidCredentialsException(ErrorCode errorCode) {
        super(errorCode);
    }
}
