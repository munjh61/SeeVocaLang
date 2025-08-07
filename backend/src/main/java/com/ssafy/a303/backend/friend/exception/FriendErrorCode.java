package com.ssafy.a303.backend.friend.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum FriendErrorCode implements ErrorCode {

    FRIEND_STATUS_IS_EMPTY(400, "status cannot be null or empty"),
    FRIEND_REQUEST_NOT_FOUND(404, "없는 친구 요청입니다."),
    FRIEND_CANT_DELETE(500, "친구및 요청을 삭제하지 못했습니다."),
    FRIEND_ALREADY_RECEIVED_REQUEST(409, "이미 요청을 받거나 요청을 한 유저입니다.");

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
