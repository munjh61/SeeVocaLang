package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.email.dto.EmailMessages;
import com.ssafy.a303.backend.email.dto.EmailSendRequestDto;
import com.ssafy.a303.backend.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /// 회원가입
    // 비밀번호 찾기 -> 임시 비밀번호 발급
    @PutMapping("/api/v1/auth/password")
    public ResponseEntity<BaseResponseDto<Void>> resetPassword(@RequestBody @Valid EmailSendRequestDto request) {
        userService.resetPasswordByEmail(request.getEmail());

        BaseResponseDto<Void> response = BaseResponseDto.<Void>builder()
                .message(EmailMessages.TEMP_PASSWORD_SENT)
                .build();

        return ResponseEntity.ok(response);
    }

    /// 마이페이지
    // 회원 탈퇴

    // 이메일 인증코드 전송
    @GetMapping("/api/v1/users/validation-code")
    public ResponseEntity<BaseResponseDto<Void>> sendValidationCode(
            @RequestParam("email") String email,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        userService.sendEmailVerificationCode(user.getUserId(), email);

        BaseResponseDto<Void> response = BaseResponseDto.<Void>builder()
                .message(EmailMessages.EMAIL_VALIDATION_CODE_SENT)
                .build();

        return ResponseEntity.ok(response);
    }

    // 이메일 인증
    @GetMapping("/api/v1/users/validation-email")
    public ResponseEntity<BaseResponseDto<Void>> verifyEmailCode(
            @RequestParam("email") String email,
            @RequestParam("code") String code,
            @AuthenticationPrincipal CustomUserDetails user
    ){
        userService.verifyEmailCode(user.getUserId(), email, code);

        BaseResponseDto<Void> response = BaseResponseDto.<Void>builder()
                .message(EmailMessages.EMAIL_VERIFICATION_SUCCESS)
                .build();

        return ResponseEntity.ok(response);
    }

    // 사용자 정보 수정

}
