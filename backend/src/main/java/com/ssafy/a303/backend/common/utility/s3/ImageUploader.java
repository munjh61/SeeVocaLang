package com.ssafy.a303.backend.common.utility.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageUploader {

    private final S3Helper helper;

    public String upload(Long userId, String word, byte[] fileBytes) {
        String key = String.format("%s/%d/%s", S3Directory.IMAGE.getPath(), userId, word);
        return helper.upload(key, fileBytes);
    }

    public String update(Long userId, String word, byte[] file) {
        String key = String.format("%s/%d/%s", S3Directory.IMAGE.getPath(), userId, word);
        return helper.update(key, file);
    }

    public void delete(Long userId, String word) {
        String key = String.format("%s/%d/%s", S3Directory.IMAGE.getPath(), userId, word);
        helper.delete(key);
    }
}