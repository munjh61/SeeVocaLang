package com.ssafy.a303.backend.common.security.jwt;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

@Getter
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties
{
    private String secret;
    private Duration accessMinutes;
    private Duration refreshDays;

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public void setAccessMinutes(Duration accessMinutes) {
        this.accessMinutes = accessMinutes;
    }

    public void setRefreshDays(Duration refreshDays) {
        this.refreshDays = refreshDays;
    }
}
