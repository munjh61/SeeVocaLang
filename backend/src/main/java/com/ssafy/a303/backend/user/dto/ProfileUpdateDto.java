package com.ssafy.a303.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateDto {

    @NotBlank(message = "닉네임은 필수입니다")
    @Size(max = 20, message = "닉네임은 20자 이하로 설정해주세요")
    private String nickname;

    private String currentPassword;

    @Size(min = 8, max = 12, message = "비밀번호는 8~12자 이내로 설정해주세요.")
    private String newPassword;

}