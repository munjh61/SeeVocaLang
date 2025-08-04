package com.ssafy.a303.backend.sociallogin.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class SocialLoginException extends SVLRuntimeException {
    public SocialLoginException(ErrorCode errorCode) {
        super(errorCode);
    }
}
