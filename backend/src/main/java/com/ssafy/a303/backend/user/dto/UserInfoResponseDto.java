package com.ssafy.a303.backend.user.dto;

import com.ssafy.a303.backend.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDto {
    private Long userId;
    private String loginId;
    private String nickname;
    private String email;
    private String profileImage;
    private LocalDate birthday;

    public static UserInfoResponseDto from(UserEntity user) {
        return UserInfoResponseDto.builder()
                .userId(user.getUserId())
                .loginId(user.getLoginId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .profileImage(user.getProfileImage())
                .birthday(user.getBirthday())
                .build();
    }
}
