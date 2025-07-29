package com.ssafy.a303.backend.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequestDto {

    @NotBlank(message = "ID는 필수 입력값입니다.")
    @Size(min = 4, max = 20, message = "ID는 4~20자 이내로 입력해주세요.")
    private String loginId;

    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    @Size(min = 8, max = 12, message = "비밀번호는 8~12자 이내로 설정해주세요.")
    private String password;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    @Size(max = 20, message = "닉네임은 20자 이하로 설정해주세요")
    private String nickname;
}
