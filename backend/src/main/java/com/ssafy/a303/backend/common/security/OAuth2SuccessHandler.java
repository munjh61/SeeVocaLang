package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.common.utility.redis.RefreshTokenStore;
import com.ssafy.a303.backend.common.security.jwt.JwtProperties;
import com.ssafy.a303.backend.common.security.jwt.JwtUtil;
import com.ssafy.a303.backend.common.utility.CookieUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.time.Duration;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final RefreshTokenStore refreshTokenStore;
    private final JwtProperties jwtProperties;
    private final CookieUtil cookieUtil;

    private static final String DEFAULT_REDIRECT_URI = "http://localhost:8080";
    private static final String REDIRECT_URI_COOKIE_NAME = "redirect_uri";

    // 인증 성공 했엉 그러면 이제
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();

        if (!(principal instanceof CustomUserDetails userDetails)) {
            log.error("OAuth2 로그인 실패: 예상한 CustomUserDetails가 아님. 실제 타입={}", principal.getClass().getName());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unsupported authentication principal");
            return;
        }

        Long userId = userDetails.getUserId();
        log.info("✅ 소셜 로그인 성공! userId = {}", userId);
        // accesstoken 발급해주고
        String accessToken = jwtUtil.createAccessToken(userId);

        // refreshtoken도 발급해주고
        String jti = UUID.randomUUID().toString();
        String refreshToken = jwtUtil.createRefreshToken(userId, jti);

        // refreshToken 저장
        Duration ttl = jwtProperties.getRefreshDays();
        refreshTokenStore.save(userId, jti, refreshToken, ttl); // redis에 저장
        response.addHeader("Set-Cookie", cookieUtil.createRefreshTokenCookie(refreshToken).toString()); // 쿠키에 담아주기

        // accessToken 헤더 전달
        response.setHeader("Authorization", "Bearer " + accessToken);

        // redirect uri 사용
        String redirectUri = Optional.ofNullable(WebUtils.getCookie(request, REDIRECT_URI_COOKIE_NAME))
                .map(Cookie::getValue)
                .orElse(DEFAULT_REDIRECT_URI);

        response.sendRedirect(redirectUri);
        log.info("OAuth2 로그인 성공: userId={}, jti={}, redirect={}", userId, jti, redirectUri);

    }
}
