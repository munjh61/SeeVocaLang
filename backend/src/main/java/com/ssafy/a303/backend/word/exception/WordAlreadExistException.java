package com.ssafy.a303.backend.word.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class WordAlreadExistException extends SVLRuntimeException {
    public WordAlreadExistException(ErrorCode errorCode) {
        super(errorCode);
    }
}
