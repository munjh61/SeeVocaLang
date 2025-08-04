package com.ssafy.a303.backend.common.utility.redis.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class RedisObjectNotReadableRuntimeException extends SVLRuntimeException {
    public RedisObjectNotReadableRuntimeException(RedisErrorCode errorCode) {
        super(errorCode);
    }
}