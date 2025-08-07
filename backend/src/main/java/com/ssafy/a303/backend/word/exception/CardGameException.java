package com.ssafy.a303.backend.word.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class CardGameException extends SVLRuntimeException {
    public CardGameException(ErrorCode errorCode) {
        super(errorCode);
    }
}
