package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.common.redis.RefreshTokenStore;
import com.ssafy.a303.backend.common.utility.CookieUtil;
import com.ssafy.a303.backend.user.repository.UserRepository;
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
    private final UserRepository userRepository;

    private static final String DEFAULT_REDIRECT_URI = "http://localhost:8080";
    private static final String REDIRECT_URI_COOKIE_NAME = "redirect_uri";
    private static final int REFRESH_EXP_SEC = 60 * 60 * 24 * 14;
    private final CookieUtil cookieUtil;

    // 인증 성공 했엉 그러면 이제
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();

        // accesstoken 발급해주고
        String accessToken = jwtUtil.createAccessToken(userId);

        // refreshtoken도 발급해주고
        String jti = UUID.randomUUID().toString();
        String refreshToken = jwtUtil.createRefreshToken(userId, jti);

        // refreshToken 저장
        refreshTokenStore.save(userId, jti, refreshToken, REFRESH_EXP_SEC); // redis에 저장
        cookieUtil.attachRefreshToken(response, refreshToken);

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
