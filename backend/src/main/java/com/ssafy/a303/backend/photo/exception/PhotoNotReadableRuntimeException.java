package com.ssafy.a303.backend.photo.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class PhotoNotReadableRuntimeException extends SVLRuntimeException {

    public PhotoNotReadableRuntimeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
