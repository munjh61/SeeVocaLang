package com.ssafy.a303.backend.common.utility.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class S3UnknownRuntimeException extends SVLRuntimeException {

    public S3UnknownRuntimeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
