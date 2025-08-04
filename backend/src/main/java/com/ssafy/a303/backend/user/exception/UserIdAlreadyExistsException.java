package com.ssafy.a303.backend.user.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class UserIdAlreadyExistsException extends SVLRuntimeException {
    public UserIdAlreadyExistsException(ErrorCode errorCode) {
        super(errorCode);
    }
}
