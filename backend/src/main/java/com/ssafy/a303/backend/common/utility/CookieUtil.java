package com.ssafy.a303.backend.common.utility;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
    private static final String Name = "refreshToken";
    private static final int TTL = 60 * 60 * 24 * 14;

    public void attachRefreshToken(HttpServletResponse res, String token) {
        Cookie cookie = new Cookie(Name, token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/auth");
        cookie.setMaxAge(TTL);

        res.addCookie(cookie);
    }

    public void clearRefreshToken(HttpServletResponse res) {
        Cookie cookie = new Cookie(Name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/v1/auth");
        cookie.setMaxAge(0);

        res.addCookie(cookie);
    }
}
