package com.ssafy.a303.backend.common.exception;

import lombok.Getter;

@Getter
public abstract class SVLRuntimeException extends RuntimeException {
    private final ErrorCode errorCode;

    protected SVLRuntimeException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
