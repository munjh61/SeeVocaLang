package com.ssafy.a303.backend.security;

import com.ssafy.a303.backend.user.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails {
    public CustomUserDetails(UserEntity user) {
    }
}
