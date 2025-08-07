package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class FriendRequestNotFoundException extends SVLRuntimeException {
    public FriendRequestNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
