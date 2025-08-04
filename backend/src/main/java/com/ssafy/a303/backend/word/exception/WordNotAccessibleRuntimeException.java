package com.ssafy.a303.backend.word.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class WordNotAccessibleRuntimeException extends SVLRuntimeException {
    public WordNotAccessibleRuntimeException(ErrorCode errorCode) {
        super(errorCode);
    }
}
