package com.ssafy.a303.backend.photo.utils;

<<<<<<< HEAD
import com.ssafy.a303.backend.photo.exception.PhotoUnRecognizableImageRuntimeException;
=======
>>>>>>> origin/be/feat-fast-api
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
<<<<<<< HEAD
import org.springframework.web.client.RestClientException;
=======
>>>>>>> origin/be/feat-fast-api
import org.springframework.web.multipart.MultipartFile;

@Component
public class AIServerClient {

    @Value("${server.ai.url}")
    private String aiServerUrl;

    public String readObjectResult(MultipartFile file) {
<<<<<<< HEAD
        try {
            RestClient restClient = RestClient.create(aiServerUrl);
            MultiValueMap<String, Resource> body = new LinkedMultiValueMap<>();
            body.add("file", file.getResource());

            return restClient.post()
                    .uri("/yolo")
                    .body(body)
                    .retrieve()
                    .body(String.class);
        } catch (RestClientException exception) {
            throw new PhotoUnRecognizableImageRuntimeException();
        }
=======
        RestClient restClient = RestClient.create(aiServerUrl);
        MultiValueMap<String, Resource> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());

        return restClient.post()
                .uri("/yolo")
                .body(body)
                .retrieve()
                .body(String.class);
>>>>>>> origin/be/feat-fast-api
    }
}
