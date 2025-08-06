package com.ssafy.a303.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PasswordValidationRequestDto {
    @NotBlank(message = "현재 비밀번호를 입력해주세요")
    private String password;
}
