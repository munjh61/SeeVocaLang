package com.ssafy.a303.backend.common.utility.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisImageHelper {

    private final RedisTemplate<String, RedisImage> redisTemplate;

    public void set(String key, RedisImage value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public void set(String key, RedisImage value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public RedisImage get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

}
