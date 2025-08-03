package com.ssafy.a303.backend.common.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    private static final String REDIRECT_URI_COOKIE_NAME = "redirect_uri";
    private static final String DEFAULT_REDIRECT_URI = "https://localhost:8080";

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        // redirect uri 받아오기
        String redirectUri = Optional.ofNullable(WebUtils.getCookie(request, REDIRECT_URI_COOKIE_NAME))
                .map(Cookie::getValue)
                .orElse(DEFAULT_REDIRECT_URI);

        // 실패 메시지 보내주기
        String encodedMessage = URLEncoder.encode("oauth_failed", StandardCharsets.UTF_8);
        String redirectUrlWithError = redirectUri + "?error=" + encodedMessage;

        log.warn("OAuth2 로그인 실패: reason={}", exception.getMessage());

        response.sendRedirect(redirectUrlWithError);

    }
}
