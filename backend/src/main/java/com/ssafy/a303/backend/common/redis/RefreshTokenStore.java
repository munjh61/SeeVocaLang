package com.ssafy.a303.backend.common.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RefreshTokenStore {
    private final StringRedisTemplate redis;

    // refreshToken 저장 (TTL 적용)
    public void save(Long userId, String jti, String refreshToken, long ttlSeconds) {
        redis.opsForValue().set("rt:" + userId + ":" + jti, refreshToken, ttlSeconds, TimeUnit.SECONDS);
    }

    // refreshToken 존재 여부 체크
    public boolean exists(Long userId, String jti) {
        return Boolean.TRUE.equals(redis.hasKey("rt:" + userId + ":" + jti));
    }

    // 특정 RefreshToken 삭제
    public void delete(Long userId, String jti) {
        redis.delete("rt:" + userId + ":" + jti);
    }

    // 해당 유저의 모든 RefreshToken 삭제
    public void deleteAll(Long userId) {
        Set<String> keys = redis.keys("rt:" + userId + ":*");
        if (keys != null && !keys.isEmpty()) {
            redis.delete(keys);
        }
    }
}
