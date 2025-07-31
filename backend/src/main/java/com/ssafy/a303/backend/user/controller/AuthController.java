package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.user.dto.SignUpRequestDto;
import com.ssafy.a303.backend.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // 아이디 중복확인
    @GetMapping("/api/v1/auth/validation-id")
    public ResponseEntity<BaseResponseDto<Void>> validateLoginId(@RequestParam("value") String loginId) {
        return ResponseEntity.ok(authService.validateLoginId(loginId));
    }

    // 닉네임 중복확인
    @GetMapping("/api/v1/auth/validation-nickname")
    public ResponseEntity<BaseResponseDto<Void>> validateNickname(@RequestParam("value") String nickname) {
        return ResponseEntity.ok(authService.validateNickname(nickname));
    }

    /// 로그인
    // 소셜 로그인 /api/v1/auth/social-singin

    // 일반 로그인 /api/v1/auth/singin

    // 통합 로그인 /api/v1/auth/integration-login

    // 로그아웃

    // 임시 비밀번호 발급

    // refresh token 발급


}
