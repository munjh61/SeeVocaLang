package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.user.dto.*;
import com.ssafy.a303.backend.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @PostMapping("/api/v1/auth/signup")
    public ResponseEntity<BaseResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        BaseResponseDto<Void> res = authService.signUp(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    // 아이디 중복 확인
    @GetMapping("/api/v1/auth/validation-id")
    public ResponseEntity<BaseResponseDto<Void>> validateLoginId(@RequestParam String value) {
        BaseResponseDto<Void> res = authService.validateLoginId(value);
        return ResponseEntity.ok(res);
    }

    // 닉네임 중복 확인
    @GetMapping("/api/v1/auth/validation-nickname")
    public ResponseEntity<BaseResponseDto<Void>> validateNickname(@RequestParam String value) {
        BaseResponseDto<Void> res = authService.validateNickname(value);
        return ResponseEntity.ok(res);
    }

    // 로그인
    @PostMapping("/api/v1/auth/signin")
    public ResponseEntity<BaseResponseDto<SignInResponseDto>> signIn(
            @Valid @RequestBody SignInRequestDto requestDto,
            HttpServletResponse response
    ) {
        // AuthService 가: RT 쿠키 부착, AT 헤더(X-Access-Token) 설정을 수행함
        SignInResponseDto data = authService.signIn(requestDto, response);

        BaseResponseDto<SignInResponseDto> body = BaseResponseDto.<SignInResponseDto>builder()
                .message(UserResponseMessages.SIGN_IN_SUCCESS)
                .content(data)
                .build();

        return ResponseEntity.ok(body);
    }

    // 로그아웃
    @PostMapping("/api/v1/auth/signout")
    public ResponseEntity<BaseResponseDto<Void>> signOut(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshToken = extractRefreshTokenFromCookie(request);

        if (!StringUtils.hasText(refreshToken)) {
            log.warn("로그아웃 실패 - 리프레시 토큰 없음");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    BaseResponseDto.<Void>builder()
                            .message(UserResponseMessages.SIGN_OUT_NO_REFRESH_TOKEN)
                            .build()
            );
        }

        BaseResponseDto<Void> res = authService.signOut(refreshToken, response);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/api/v1/auth/refresh")
    public ResponseEntity<BaseResponseDto<AccessTokenResponseDto>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshToken = extractRefreshTokenFromCookie(request);

        BaseResponseDto<AccessTokenResponseDto> result = authService.reissue(refreshToken, response);

        return ResponseEntity.ok(result);

    }

    // 쿠키에서 refreshToken 추출
    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if ("refreshToken".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }


}
