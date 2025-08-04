package com.ssafy.a303.backend.common.utility.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedisWordImage {
    private String key;
    private String contentType;
    private long contentLength;
    private byte[] content;
    private String nameEn;
}