package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.user.dto.*;
import com.ssafy.a303.backend.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

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
                .message(ResponseMessages.SIGN_IN_SUCCESS)
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
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    BaseResponseDto.<Void>builder()
                            .message(ResponseMessages.SIGN_OUT_NO_REFRESH_TOKEN)
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

    @GetMapping("/oauth2/test")
    public ResponseEntity<String> oauth2Test() {
        return ResponseEntity.ok("OAuth2 테스트 엔드포인트가 정상적으로 작동합니다.");
    }

    @GetMapping("/oauth2/login")
    public ResponseEntity<String> oauth2LoginInfo() {
        return ResponseEntity.ok("""
            OAuth2 로그인 정보:
            - 카카오: /oauth2/authorization/kakao
            - 네이버: /oauth2/authorization/naver  
            - 구글: /oauth2/authorization/google
            """);
    }

    @GetMapping("/oauth2/debug")
    public ResponseEntity<Map<String, Object>> oauth2Debug() {
        Map<String, Object> debugInfo = new HashMap<>();
        debugInfo.put("message", "OAuth2 디버그 정보");
        debugInfo.put("timestamp", System.currentTimeMillis());
        debugInfo.put("endpoints", Arrays.asList(
            "/oauth2/authorization/kakao",
            "/oauth2/authorization/naver", 
            "/oauth2/authorization/google"
        ));
        return ResponseEntity.ok(debugInfo);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<String> oauth2Success() {
        return ResponseEntity.ok("OAuth2 로그인 성공!");
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
