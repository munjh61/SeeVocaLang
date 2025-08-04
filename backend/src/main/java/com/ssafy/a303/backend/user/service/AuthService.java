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
import com.ssafy.a303.backend.user.exception.*;
import com.ssafy.a303.backend.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Map;
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
        String at = jwtUtil.createAccessToken(user.getUserId());
        String rt = jwtUtil.createRefreshToken(user.getUserId(), jti);

        long refreshTokenTTL = 60 * 60 * 24 * 14;

        rts.save(user.getUserId(), jti, rt, refreshTokenTTL);

        cookie.attachRefreshToken(response, rt);

        response.addHeader("X-Access-Token", at);

        return new SignInResponseDto(user.getNickname(), user.getProfileImage());

    }

    // 로그아웃
    public void signOut(String refreshToken, HttpServletResponse response) {
        Long userId = jwtUtil.getUserId(refreshToken);
        String jti = jwtUtil.getJti(refreshToken);
        rts.delete(userId, jti);

        cookie.clearRefreshToken(response);
    }

    // accessToken 재발금
    public Map<String, String> reissue(String refreshToken, HttpServletResponse response) {
        if (!StringUtils.hasText(refreshToken)) {
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_NOT_PROVIDED);
        }

        if (!jwtUtil.validate(refreshToken)) {
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_INVALID);
        }

        Long userId = jwtUtil.getUserId(refreshToken);
        String jti = jwtUtil.getJti(refreshToken);

        if (!rts.exists(userId, jti)) {
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_EXPIRED_OR_NOT_FOUND);
        }

        String newAccessToken = jwtUtil.createAccessToken(userId);
        String newJti = UUID.randomUUID().toString();
        String newRefreshToken = jwtUtil.createRefreshToken(userId, newJti);

        rts.save(userId, newJti, newRefreshToken, 60 * 60 * 24 * 14); // 14일 TTL
        rts.delete(userId, jti);

        cookie.attachRefreshToken(response, newRefreshToken);
        response.setHeader("Authorization", "Bearer " + newAccessToken);

        return Map.of("accessToken", newAccessToken);
    }

}
