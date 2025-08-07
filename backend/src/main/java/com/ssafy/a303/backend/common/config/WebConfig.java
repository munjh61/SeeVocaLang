package com.ssafy.a303.backend.common.config;

import com.ssafy.a303.backend.folder.interceptor.FolderAuthCheckInterceptor;
import com.ssafy.a303.backend.folder.service.FolderService;
import com.ssafy.a303.backend.friend.converter.FriendStatusConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final FolderAuthCheckInterceptor folderAuthCheckInterceptor;
    private final FriendStatusConverter friendStatusConverter;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(folderAuthCheckInterceptor)
                .addPathPatterns("/api/v1/folders/**");
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(friendStatusConverter);
    }
}
