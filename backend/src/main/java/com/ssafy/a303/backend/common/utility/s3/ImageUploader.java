package com.ssafy.a303.backend.common.utility.s3;

import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Value;
=======
>>>>>>> origin/be/feat-fast-api
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageUploader {

<<<<<<< HEAD
    @Value("${spring.cloud.aws.s3.root-directory}")
    private String rootDirectory;

    private final S3Helper helper;

    public String upsert(Long userId, String word, byte[] fileBytes, String contentType) {
        String key = String.format("%s/%s/%d/%s", rootDirectory, S3Directory.IMAGE.getPath(), userId, word);
        return helper.upload(key, fileBytes, contentType);
    }

    public void delete(Long userId, String word) {
        String key = String.format("%s/%s/%d/%s", rootDirectory, S3Directory.IMAGE.getPath(), userId, word);
=======
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
>>>>>>> origin/be/feat-fast-api
        helper.delete(key);
    }
}