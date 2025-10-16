package com.ssafy.a303.backend.common.utility.redis.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class RedisObjectAlreadyExistRuntimeException extends SVLRuntimeException {

  public RedisObjectAlreadyExistRuntimeException(RedisErrorCode errorCode) {
      super(errorCode);
  }

}
