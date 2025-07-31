package com.ssafy.a303.backend.common.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;

    // AccessToken 만료 시간 (15분)
    private final long accessTokenExp = 1000L * 60 * 15;

    // RefreshToken 만료 시간 (14일)
    private final long refreshTokenExp = 1000L * 60 * 60 * 24 * 14;

    /**
     * secret을 읽어서 Key 객체 생성
     */
    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        byte[] raw = secret.getBytes(StandardCharsets.UTF_8);

        // HS256 알고리즘을 위해 최소 32바이트 이상 체크
        if (raw.length < 32) {
            throw new IllegalStateException("spring.jwt.secret must be >= 32 bytes");
        }

        this.key = Keys.hmacShaKeyFor(raw);
    }

    /**
     * AccessToken 생성
     *
     * @param userId 사용자 ID
     */
    public String createAccessToken(String userId) {
        return Jwts.builder()
                .setSubject(userId) // 토큰 주체 = userId
                .setIssuedAt(new Date()) // 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExp))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * RefreshToken 생성
     *
     * @param userId 사용자 ID
     * @param jti RefreshToken의 고유 ID (UUID)
     */
    public String createRefreshToken(String userId, String jti) {
        return Jwts.builder()
                .setSubject(userId)
                .setId(jti) // RefreshToken 구분용 ID
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExp))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰 유효성 검증
     *
     * @return true = 유효, false = 만료/서명 오류
     */
    public boolean validate(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * 토큰에서 사용자 ID(subject) 추출
     */
    public String getUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * RefreshToken에서 jti 추출
     */
    public String getJti(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody().getId();
    }

}
