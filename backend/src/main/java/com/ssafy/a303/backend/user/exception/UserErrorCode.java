package com.ssafy.a303.backend.user.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum UserErrorCode implements ErrorCode {
    // 사용자 인증 관련
    INVALID_CREDENTIALS(400, "아이디 또는 비밀번호가 올바르지 않습니다."),
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),
    
    // 사용자 등록 관련
    USER_ID_ALREADY_EXISTS(409, "이미 사용 중인 아이디입니다."),
    USER_NICKNAME_ALREADY_EXISTS(409, "이미 사용 중인 닉네임입니다."),
    NICKNAME_GENERATION_FAILED(409, "닉네임 중복이 너무 많습니다. 다른 닉네임을 사용해주세요."),
    IMAGE_UPLOAD_FAILED(500, "프로필 사진 업로드에 실패했습니다."),
    
    // 정규식 관련
    INVALID_PASSWORD_FORMAT(400, "비밀번호는 8자 이상, 영문/숫자/특수문자 조합이어야 합니다."),
    INVALID_NICKNAME_FORMAT(400, "닉네임은 2-10자 영문/한글/숫자 조합이어야 합니다."),
    INVALID_LOGIN_ID_FORMAT(400, "아이디는 4-20자 영문/숫자 조합이어야 합니다.");

    private final int statusCode;
    private final String message;

    @Override
    public int getStatusCode() {
        return this.statusCode;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
} 