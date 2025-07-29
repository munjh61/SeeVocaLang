package com.ssafy.a303.backend.user.service.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class UserNicknameAlreadyExistsException extends SVLRuntimeException {
    public UserNicknameAlreadyExistsException(ErrorCode errorCode) {
        super(errorCode);
    }
}
