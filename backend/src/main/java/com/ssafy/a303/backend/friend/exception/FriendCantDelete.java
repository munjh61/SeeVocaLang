package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class FriendCantDelete extends SVLRuntimeException {

    public FriendCantDelete(ErrorCode errorCode) {
        super(errorCode);
    }
}
