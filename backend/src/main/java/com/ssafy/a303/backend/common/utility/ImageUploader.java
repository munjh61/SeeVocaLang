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
        String extension = this.getFileExtension(file.getContentType());
        String key = String.format("%s/%d/%s.%s", S3Directory.IMAGE.getPath(), userId, word, extension);
        return helper.upload(key, file);
    }

    private String getFileExtension(String contentType) {
        return switch (contentType) {
            case "image/jpeg" -> "jpg";
            case "image/png" -> "png";
            case "image/gif" -> "gif";
            default -> throw new S3UnknownRuntimeException(S3ErrorCode.UNKNOWN_ERROR);
        };
    }
}