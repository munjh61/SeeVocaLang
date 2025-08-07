package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum FriendErrorCode implements ErrorCode {

    STATUS_IS_EMPTY(400, "status cannot be null or empty");

    private final int status;
    private final String message;

    @Override
    public int getStatusCode() {
        return this.status;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
