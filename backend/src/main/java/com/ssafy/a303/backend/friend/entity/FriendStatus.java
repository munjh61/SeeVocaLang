package com.ssafy.a303.backend.friend.entity;

import com.ssafy.a303.backend.friend.exception.FriendErrorCode;
import com.ssafy.a303.backend.friend.exception.StatusInvalidException;

public enum FriendStatus {
    PENDING, APPROVED;

    public static FriendStatus convert(String status) {
        if (status == null || status.isEmpty()) {
            throw new StatusInvalidException(FriendErrorCode.STATUS_IS_EMPTY);
        }

        for (FriendStatus friendStatus : FriendStatus.values()) {
            if(friendStatus.name().equalsIgnoreCase(status)) {
                return friendStatus;
            }
        }

        throw new StatusInvalidException(FriendErrorCode.STATUS_IS_EMPTY);
    }
}
