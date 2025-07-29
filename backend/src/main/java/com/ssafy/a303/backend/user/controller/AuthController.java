package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.security.JwtUtil;
import com.ssafy.a303.backend.user.dto.SignUpRequestDto;
import com.ssafy.a303.backend.user.service.AuthService;
import com.ssafy.a303.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /// 회원가입
    // 일반 회원가입
    @PostMapping("/api/v1/auth/signup")
    public ResponseEntity<BaseResponseDto<Void>> signUp(@RequestBody SignUpRequestDto requestDto) {
        return ResponseEntity.ok(authService.signUp(requestDto));
    }

    /// 로그인
    // 소셜 로그인

    // 일반 로그인

    // 통합 로그인

    // 로그아웃

    // 임시 비밀번호 발급

    // refresh token 발급


}
