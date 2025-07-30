package com.ssafy.a303.backend.common.utility;

import com.ssafy.a303.backend.common.utility.exception.S3ErrorCode;
import com.ssafy.a303.backend.common.utility.exception.S3UnknownRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageUploader {

    private final S3Helper helper;

    public String upload(Long userId, String word, MultipartFile file) {
        String key = String.format("%s/%d/%s", S3Directory.IMAGE.getPath(), userId, word);
        return helper.upload(key, file);
    }

    public String update(Long userId, String word, MultipartFile file) {
        String key = String.format("%s/%d/%s", S3Directory.IMAGE.getPath(), userId, word);
        return helper.update(key, file);
    }
}