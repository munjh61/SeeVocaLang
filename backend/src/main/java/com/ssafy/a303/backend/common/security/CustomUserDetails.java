package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.user.entity.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
public class CustomUserDetails implements UserDetails, OAuth2User {

    private final String loginId;
    private final String password;
    private final String nickname;
    private final String profileImage;
    private final Long userId;

    public CustomUserDetails(Long userId, String loginId, String password, String nickname, String profileImage) {
        this.userId = userId;
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public static CustomUserDetails from(UserEntity user) {
        return new CustomUserDetails(
                user.getUserId(),
                user.getLoginId(),
                user.getPassword(),
                user.getNickname(),
                user.getProfileImage()
        );
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return loginId != null ? loginId : nickname;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    @Override
    public String getName() {
        return loginId != null ? loginId : nickname;
    }
}
