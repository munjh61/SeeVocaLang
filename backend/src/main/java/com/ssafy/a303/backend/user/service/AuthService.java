package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;
import com.ssafy.a303.backend.common.redis.RefreshTokenStore;
import com.ssafy.a303.backend.common.security.JwtUtil;
import com.ssafy.a303.backend.common.utility.CookieUtil;
import com.ssafy.a303.backend.user.dto.SignInRequestDto;
import com.ssafy.a303.backend.user.dto.SignInResponseDto;
import com.ssafy.a303.backend.user.dto.SignUpRequestDto;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.InvalidCredentialsException;
import com.ssafy.a303.backend.user.exception.UserIdAlreadyExistsException;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import com.ssafy.a303.backend.user.exception.UserNicknameAlreadyExistsException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenStore rts;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookie;

    // 회원가입
    public BaseResponseDto<Void> signUp(SignUpRequestDto requestDto) {
        // 아이디 중복 체크
        if (userRepository.existsByLoginId(requestDto.getLoginId())) {
            throw new UserIdAlreadyExistsException(CommonErrorCode.RESOURCE_ALREADY_EXIST);
        }

        // 닉네임 중복 체크
        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new UserNicknameAlreadyExistsException(CommonErrorCode.RESOURCE_ALREADY_EXIST);
        }

        // 저장
        UserEntity user = new UserEntity(
                requestDto.getLoginId(),
                passwordEncoder.encode(requestDto.getPassword()),
                requestDto.getNickname(),
                false
        );

        userRepository.save(user);

        return BaseResponseDto.<Void>builder()
                .message("회원가입이 완료되었습니다.")
                .build();
    }

    // 아이디 중복 확인
    public BaseResponseDto<Void> validateLoginId(String loginId) {
        if (userRepository.existsByLoginId(loginId)) {
            throw new UserIdAlreadyExistsException(CommonErrorCode.RESOURCE_ALREADY_EXIST);
        }
        return BaseResponseDto.<Void>builder()
                .message("사용 가능한 아이디입니다.")
                .build();
    }

    // 닉네임 사용 가능 여부 검증
    public BaseResponseDto<Void> validateNickname(String nickname) {
        if (userRepository.existsByNickname(nickname)) {
            throw new UserNicknameAlreadyExistsException(CommonErrorCode.RESOURCE_ALREADY_EXIST);
        }
        return BaseResponseDto.<Void>builder()
                .message("사용 가능한 닉네임입니다.")
                .build();
    }

    // 로그인
    public SignInResponseDto signIn(SignInRequestDto requestDto, HttpServletResponse response) {
        UserEntity user = userRepository.findByLoginId(requestDto.getLoginId())
                .orElseThrow(() -> new InvalidCredentialsException(CommonErrorCode.INVALID_INPUT));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException(CommonErrorCode.INVALID_INPUT);
        }

        String jti = UUID.randomUUID().toString();
        String at = jwtUtil.createAccessToken(user.getLoginId().toString());
        String rt = jwtUtil.createRefreshToken(user.getLoginId().toString(), jti);

        long refreshTokenTTL = 60 * 60 * 24 * 14;

        rts.save(user.getLoginId().toString(), jti, rt, refreshTokenTTL);

        cookie.attachRefreshToken(response, rt);

        response.addHeader("X-Access-Token", at);

        return new SignInResponseDto(user.getNickname(), user.getProfileImage());

    }

    // 로그아웃
    public void signOut(String refreshToken, HttpServletResponse response) {
        String userKey = jwtUtil.getUserId(refreshToken); // <- subject = loginId
        String jti = jwtUtil.getJti(refreshToken);
        rts.delete(userKey, jti);
        cookie.clearRefreshToken(response);
    }

}
