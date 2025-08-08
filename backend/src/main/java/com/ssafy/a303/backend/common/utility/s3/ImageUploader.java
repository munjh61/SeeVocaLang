package com.ssafy.a303.backend.common.utility.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageUploader {

    @Value("${spring.cloud.aws.s3.root-directory}")
    private String rootDirectory;

    private final S3Helper helper;

    public String upsert(Long userId, String word, byte[] fileBytes, String contentType) {
        String key = String.format("%s/%s/%d/%s", rootDirectory, S3Directory.IMAGE.getPath(), userId, word);
        return helper.upload(key, fileBytes, contentType);
    }

    public void delete(Long userId, String word) {
        String key = String.format("%s/%s/%d/%s", rootDirectory, S3Directory.IMAGE.getPath(), userId, word);
        helper.delete(key);
    }
}