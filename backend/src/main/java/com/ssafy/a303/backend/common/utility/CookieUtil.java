package com.ssafy.a303.backend.common.utility;

import com.ssafy.a303.backend.common.security.jwt.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CookieUtil {

    private final JwtProperties jwtProperties;

    // 리프레시 토큰을 담은 쿠키 생성
    public ResponseCookie createRefreshTokenCookie(String refreshToken) {
        long maxAgeSeconds = jwtProperties.getRefreshDays().getSeconds();

        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(maxAgeSeconds)
                .path("/")
                .build();
    }

    // 쿠키 삭제
    public ResponseCookie deleteRefreshTokenCookie() {
        return ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(0)
                .path("/")
                .build();
    }
}
