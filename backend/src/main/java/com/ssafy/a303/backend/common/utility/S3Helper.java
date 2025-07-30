package com.ssafy.a303.backend.common.utility;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.utility.exception.S3ErrorCode;
import com.ssafy.a303.backend.common.utility.exception.S3ObjectNotFoundRuntimeException;
import com.ssafy.a303.backend.common.utility.exception.S3UnknownRuntimeException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
@Transactional
public class S3Helper {

    private final S3Client s3Client;

    @Value("${spring.cloud.aws.s3.bucket-name}")
    private String bucket;

    @Value("${spring.cloud.aws.region.static}")
    private String region;

    public String getObjectUrl(String key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucket, region, key);
    }

    public String upload(String key, MultipartFile file) {
        try (InputStream is = file.getInputStream()) {
            PutObjectRequest putReq = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .contentLength(file.getSize())
                    .build();

            s3Client.putObject(putReq, RequestBody.fromInputStream(is, file.getSize()));
            return this.getObjectUrl(key);
        } catch (IOException exception) {
            throw new S3UnknownRuntimeException(S3ErrorCode.UNKNOWN_ERROR);
        }
    }
}