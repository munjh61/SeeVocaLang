package com.ssafy.a303.backend.user.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class UserNotFoundException extends SVLRuntimeException {
    public UserNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
