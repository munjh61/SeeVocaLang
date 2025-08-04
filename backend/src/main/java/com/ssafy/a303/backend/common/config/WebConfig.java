package com.ssafy.a303.backend.common.config;

import com.ssafy.a303.backend.folder.interceptor.FolderAuthCheckInterceptor;
import com.ssafy.a303.backend.folder.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final FolderService folderService;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new FolderAuthCheckInterceptor(folderService))
                .addPathPatterns("/api/v1/folders/**");
    }
}
