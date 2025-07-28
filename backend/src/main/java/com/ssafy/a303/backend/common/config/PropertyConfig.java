package com.ssafy.a303.backend.common.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

@Configuration
@EnableConfigurationProperties
@PropertySources({
        @PropertySource(value = "classpath:properties/env.properties")
})
public class PropertyConfig {
}
