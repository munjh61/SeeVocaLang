package com.ssafy.a303.backend.common.utility.redis;

import com.ssafy.a303.backend.common.utility.redis.exception.RedisErrorCode;
import com.ssafy.a303.backend.common.utility.redis.exception.RedisObjectAlreadyExistRuntimeException;
import com.ssafy.a303.backend.common.utility.redis.exception.RedisObjectNotFoundRuntimeException;
import com.ssafy.a303.backend.common.utility.redis.exception.RedisObjectNotReadableRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class ObjectDetectionImageHandler {

    private final RedisImageHelper redisImageHelper;

    private static final Duration TEMP_IMAGE_TTL = Duration.ofHours(1);

    public RedisImage getImage(String key) {
        RedisImage image = redisImageHelper.get(key);
        if (Objects.isNull(image)) {
            throw new RedisObjectNotFoundRuntimeException(RedisErrorCode.OBJECT_NOT_FOUND);
        }

        return image;
    }

    public String saveImage(MultipartFile file, Long userId, String objectName) {
        String key = buildTempKey(userId, objectName);
        if (redisImageHelper.get(key) != null) {
            throw new RedisObjectAlreadyExistRuntimeException(RedisErrorCode.OBJECT_ALREADY_EXIST);
        }

        try {
            RedisImage img = RedisImage.builder()
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .content(file.getBytes())
                    .build();
            redisImageHelper.set(key, img, TEMP_IMAGE_TTL);
            return key;
        } catch (IOException e) {
            throw new RedisObjectNotReadableRuntimeException(RedisErrorCode.OBJECT_NOT_READABLE);
        }
    }

    private String updateImage(MultipartFile file, Long userId, String word) {
        String key = buildTempKey(userId, word);
        if (redisImageHelper.get(key) == null) {
            throw new RedisObjectNotFoundRuntimeException(RedisErrorCode.OBJECT_NOT_FOUND);
        }

        return saveImage(file, userId, word);
    }

    public void deleteImage(Long userId, String word) {
        String key = buildTempKey(userId, word);
        redisImageHelper.delete(key);
    }

    private String buildTempKey(Long userId, String objectName) {
        // TODO: 양 끝에 쌍따옴표 떼기 로직 삭제
        String key = String.format("%d:%s", userId, objectName.replaceAll("^\"+|\"+$", ""));
        System.out.println(key);
        return key;
    }
}
