package com.ssafy.a303.backend.common.config;

<<<<<<< HEAD
import com.ssafy.a303.backend.common.utility.redis.RedisWordImage;
=======
import com.ssafy.a303.backend.common.utility.redis.RedisImage;
>>>>>>> origin/be/feat-fast-api
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
<<<<<<< HEAD
=======
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
>>>>>>> origin/be/feat-fast-api
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Value("${spring.data.redis.host}")
    private String host;

    @Value("${spring.data.redis.port}")
    private int port;

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory(host, port);
    }

    @Bean
<<<<<<< HEAD
    public RedisTemplate<String, RedisWordImage> redisTemplate() {
        RedisTemplate<String, RedisWordImage> redisTemplate = new RedisTemplate<>();
=======
    public RedisTemplate<String, RedisImage> redisTemplate() {
        RedisTemplate<String, RedisImage> redisTemplate = new RedisTemplate<>();
>>>>>>> origin/be/feat-fast-api
        redisTemplate.setConnectionFactory(redisConnectionFactory());

        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

<<<<<<< HEAD
        Jackson2JsonRedisSerializer <RedisWordImage> serializer = new Jackson2JsonRedisSerializer<>(RedisWordImage.class);
=======
        Jackson2JsonRedisSerializer <RedisImage> serializer = new Jackson2JsonRedisSerializer<>(RedisImage.class);
>>>>>>> origin/be/feat-fast-api
        redisTemplate.setValueSerializer(serializer);
        redisTemplate.setHashValueSerializer(serializer);

        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }
}
