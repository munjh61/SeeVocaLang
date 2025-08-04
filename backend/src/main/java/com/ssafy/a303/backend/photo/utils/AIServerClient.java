package com.ssafy.a303.backend.photo.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Component
public class AIServerClient {

    @Value("${server.ai.url}")
    private String aiServerUrl;

    public String readObjectResult(MultipartFile file) {
        RestClient restClient = RestClient.create(aiServerUrl);
        MultiValueMap<String, Resource> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());

        return restClient.post()
                .uri("/yolo")
                .body(body)
                .retrieve()
                .body(String.class);
    }
}
