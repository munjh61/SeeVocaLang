package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class AlreadyReceivedRequest extends SVLRuntimeException {
    public AlreadyReceivedRequest(ErrorCode errorCode) {
        super(errorCode);
    }
}
