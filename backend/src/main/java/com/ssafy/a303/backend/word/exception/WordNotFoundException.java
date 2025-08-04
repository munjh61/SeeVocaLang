package com.ssafy.a303.backend.word.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class WordNotFoundException extends SVLRuntimeException {
    public WordNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
