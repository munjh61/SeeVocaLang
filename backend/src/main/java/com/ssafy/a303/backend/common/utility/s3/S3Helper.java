package com.ssafy.a303.backend.common.utility.s3;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.utility.s3.exception.S3ErrorCode;
import com.ssafy.a303.backend.common.utility.s3.exception.S3ObjectNotFoundRuntimeException;
import com.ssafy.a303.backend.common.utility.s3.exception.S3UnknownRuntimeException;
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

    public boolean exists(String key) {
        try {
            s3Client.headObject(HeadObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .build());

            return true;
        } catch (S3Exception exception) {
            if (exception.statusCode() == 404) {
                return false;
            }

            throw new S3UnknownRuntimeException(S3ErrorCode.UNKNOWN_ERROR);
        }
    }

    public String upload(String key, byte[] fileBytes, String contentType) {
        try {
            PutObjectRequest putReq = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(contentType)
                    .contentLength((long) fileBytes.length)
                    .build();

            s3Client.putObject(putReq, RequestBody.fromBytes(fileBytes));
            return getObjectUrl(key);
        } catch (S3Exception e) {
            throw new S3UnknownRuntimeException(S3ErrorCode.UNKNOWN_ERROR);
        }
    }

    public String update(String key, byte[] fileBytes, String contentType) {
        if (!exists(key)) {
            throw new S3ObjectNotFoundRuntimeException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }

        return upload(key, fileBytes, contentType);
    }

    public void delete(String key) {
        try {
            DeleteObjectRequest delReq = DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .build();
            s3Client.deleteObject(delReq);
        } catch (S3Exception e) {
            if (e.statusCode() == 404) {
                throw new S3ObjectNotFoundRuntimeException(CommonErrorCode.RESOURCE_NOT_FOUND);
            }
            throw new S3UnknownRuntimeException(S3ErrorCode.UNKNOWN_ERROR);
        }
    }
}