package com.ssafy.a303.backend.email.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class EmailSendException extends SVLRuntimeException {
    public EmailSendException(ErrorCode errorCode) {
        super(errorCode);
    }
}
