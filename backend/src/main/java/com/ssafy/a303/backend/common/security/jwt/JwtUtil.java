package com.ssafy.a303.backend.common.security.jwt;

import com.ssafy.a303.backend.common.exception.AuthErrorCode;
import com.ssafy.a303.backend.user.exception.AuthException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;
    private Key key;

    // jwt.secret 값을 HMAC 키로 변환
    @PostConstruct
    public void initKey() {
        byte[] raw = jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8);

        if (raw.length < 32) {
            throw new AuthException(AuthErrorCode.INVALID_SECRET_KEY);
        }

        this.key = Keys.hmacShaKeyFor(raw);
    }

    // accessToken 생성
    public String createAccessToken(Long userId) {
        long expMillis = jwtProperties.getAccessMinutes().toMillis();

        return Jwts.builder()
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expMillis))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // refreshToken 생성
     public String createRefreshToken(Long userId, String jti) {
         long expMillis = jwtProperties.getRefreshDays().toMillis();

         return Jwts.builder()
                 .claim("userId", userId)
                 .setId(jti)
                 .setIssuedAt(new Date())
                 .setExpiration(new Date(System.currentTimeMillis() + expMillis))
                 .signWith(key, SignatureAlgorithm.HS256)
                 .compact();
     }

     // 토큰 유효성 검증
    public boolean validate(String token) {
        try{
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // 토큰에서 userId 추출
    public Long getUserId(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId", Long.class);
    }

    // refreshToken에서 jti 추출 -> 서버에 등록된 유효한 토큰인지 검증
    public String getJti(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getId();
    }

}
