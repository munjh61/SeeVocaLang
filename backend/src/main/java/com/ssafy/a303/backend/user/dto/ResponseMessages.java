package com.ssafy.a303.backend.user.dto;

public class ResponseMessages {
    private ResponseMessages() {}

    // 회원가입 & 로그인
    public static final String SIGN_UP_SUCCESS = "회원가입이 완료되었습니다.";
    public static final String SIGN_IN_SUCCESS = "로그인 성공";
    public static final String SIGN_OUT_SUCCESS = "로그아웃 성공";

    // 토큰 관련
    public static final String TOKEN_REISSUE_SUCCESS = "토큰 재발급 성공";
    public static final String SIGN_OUT_NO_REFRESH_TOKEN = "리프레시 토큰이 없습니다. 쿠키 또는 헤더/파라미터를 확인하세요.";

    // 유효성 검사
    public static final String VALID_ID = "사용 가능한 아이디입니다.";
    public static final String VALID_NICKNAME = "사용 가능한 닉네임입니다.";
}
