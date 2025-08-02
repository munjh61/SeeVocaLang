package com.ssafy.a303.backend.common.utility.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisImageHelper {

    private final RedisTemplate<String, RedisWordImage> redisTemplate;

    public void set(String key, RedisWordImage value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public RedisWordImage get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

}
