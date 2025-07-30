package com.ssafy.a303.backend.common.utility.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class S3ObjectNotFoundRuntimeException extends SVLRuntimeException {
    public S3ObjectNotFoundRuntimeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
