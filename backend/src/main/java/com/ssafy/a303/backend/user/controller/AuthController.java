package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.security.JwtUtil;
import com.ssafy.a303.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    /// 로그인
    // 소셜 로그인


    // 일반 로그인

    // 통합 로그인

    // 임시 비밀번호 발급

    // refresh token 발급

    /// 회원가입
    // 일반 회원가입

    // ID 중복 확인

    // 닉네임 중복 확인

}
