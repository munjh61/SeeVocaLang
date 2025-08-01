package com.ssafy.a303.backend.common.utility.redis.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum RedisErrorCode implements ErrorCode {
    OBJECT_ALREADY_EXIST(409, "Redis에 key값에 해당하는 객체가 이미 존재합니다."),
    OBJECT_NOT_FOUND(404,"Redis에 key값에 해당하는 객체가 존재하지 않습니다." ),
    OBJECT_NOT_READABLE(400, "Redis에 처리할 객체의 정보를 읽어올 수 없습니다.");


    private final int statusCode;
    private final String message;

    @Override
    public int getStatusCode() {
        return 0;
    }

    @Override
    public String getMessage() {
        return "";
    }
}
