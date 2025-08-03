package com.ssafy.a303.backend.sociallogin.dto;

public class SocialLoginMessages {
    private SocialLoginMessages() {}

    public static final String LOGIN_SUCCESS = "소셜 로그인 성공";
    public static final String LOGIN_FAILED_DELETED_USER = "탈퇴 유저는 로그인할 수 없습니다.";
    public static final String NEW_USER_REGISTERED = "신규 유저 소셜 회원가입 완료";
    public static final String UNSUPPORTED_PROVIDER = "지원하지 않는 소셜 로그인입니다.";
    public static final String DUPLICATE_SOCIAL_LOGIN = "이미 등록된 소셜 로그인 정보입니다.";
}
