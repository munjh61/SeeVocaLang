package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class StatusInvalidException extends SVLRuntimeException {
    public StatusInvalidException(ErrorCode errorCode) {
        super(errorCode);
    }
}
