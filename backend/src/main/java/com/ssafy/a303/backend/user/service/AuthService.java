package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.folder.dto.CreateFolderCommandDto;
import com.ssafy.a303.backend.folder.service.FolderService;
import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.common.exception.AuthErrorCode;
import com.ssafy.a303.backend.common.utility.redis.RefreshTokenStore;
import com.ssafy.a303.backend.common.security.jwt.JwtProperties;
import com.ssafy.a303.backend.common.security.jwt.JwtUtil;
import com.ssafy.a303.backend.common.utility.CookieUtil;
import com.ssafy.a303.backend.user.dto.*;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserIdAlreadyExistsException;
import com.ssafy.a303.backend.user.exception.UserNicknameAlreadyExistsException;
import com.ssafy.a303.backend.user.exception.InvalidCredentialsException;
import com.ssafy.a303.backend.user.exception.AuthException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final FolderService folderService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JwtProperties jwtProperties;
    private final RefreshTokenStore refreshTokenStore;
    private final CookieUtil cookieUtil;

    // 회원가입
    @Transactional
    public BaseResponseDto<Void> signUp(SignUpRequestDto requestDto) {
        log.info("회원가입 요청: loginId={}", requestDto.getLoginId());
        
        // 아이디 중복 체크
        if (userRepository.existsByLoginIdAndIsDeletedFalse(requestDto.getLoginId())) {
            log.warn("회원가입 실패 - 아이디 중복: loginId={}", requestDto.getLoginId());
            throw new UserIdAlreadyExistsException(UserErrorCode.USER_ID_ALREADY_EXISTS);
        }

        // 닉네임 중복 체크
        if (userRepository.existsByNicknameAndIsDeletedFalse(requestDto.getNickname())) {
            log.warn("회원가입 실패 - 닉네임 중복: nickname={}", requestDto.getNickname());
            throw new UserNicknameAlreadyExistsException(UserErrorCode.USER_NICKNAME_ALREADY_EXISTS);
        }

        // 저장
        UserEntity user = new UserEntity(
                requestDto.getLoginId(),
                passwordEncoder.encode(requestDto.getPassword()),
                requestDto.getNickname(),
                false,
                requestDto.getBirthday() // nullable 그대로 전달됨
        );

        UserEntity newUser = userRepository.save(user);
        log.info("회원가입 성공: userId={}, loginId={}", user.getUserId(), user.getLoginId());

        createDefaultFolder(newUser.getUserId());

        return BaseResponseDto.<Void>builder()
                .message(UserResponseMessages.SIGN_UP_SUCCESS)
                .build();
    }

    public void createDefaultFolder(Long userId) {
        CreateFolderCommandDto defaultFolder = CreateFolderCommandDto.builder()
                .userId(userId)
                .name("기본 단어장")
                .description("기본 단어장입니다")
                .build();

        folderService.createFolder(defaultFolder);
    }

    // 아이디 중복 확인
    public BaseResponseDto<Void> validateLoginId(String loginId) {
        if (userRepository.existsByLoginIdAndIsDeletedFalse(loginId)) {
            throw new UserIdAlreadyExistsException(UserErrorCode.USER_ID_ALREADY_EXISTS);
        }
        return BaseResponseDto.<Void>builder()
                .message(UserResponseMessages.VALID_ID)
                .build();
    }

    // 닉네임 중복 확인
    public BaseResponseDto<Void> validateNickname(String nickname) {
        if (userRepository.existsByNicknameAndIsDeletedFalse(nickname)) {
            throw new UserNicknameAlreadyExistsException(UserErrorCode.USER_NICKNAME_ALREADY_EXISTS);
        }
        return BaseResponseDto.<Void>builder()
                .message(UserResponseMessages.VALID_NICKNAME)
                .build();
    }

    // 로그인
    public SignInResponseDto signIn(SignInRequestDto requestDto, HttpServletResponse response) {
        log.info("로그인 요청: loginId={}", requestDto.getLoginId());
        
        // 유저 조회, 비밀번호 검증
        UserEntity user = userRepository.findByLoginIdAndIsDeletedFalse(requestDto.getLoginId())
                .orElseThrow(() -> {
                    log.warn("로그인 실패 - 사용자 없음: loginId={}", requestDto.getLoginId());
                    return new InvalidCredentialsException(UserErrorCode.INVALID_CREDENTIALS);
                });

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            log.warn("로그인 실패 - 비밀번호 불일치: loginId={}", requestDto.getLoginId());
            throw new InvalidCredentialsException(UserErrorCode.INVALID_CREDENTIALS);
        }

        String jti = UUID.randomUUID().toString();
        Long userId = user.getUserId();

        // JWT 발급
        String accessToken = jwtUtil.createAccessToken(userId);
        String refreshToken = jwtUtil.createRefreshToken(userId, jti);

        // redis에 refreshtoken 저장
        Duration ttl = jwtProperties.getRefreshDays();
        refreshTokenStore.save(userId, jti, refreshToken, ttl);

        // refreshToken 쿠키 전송
        response.addHeader("Set-Cookie", cookieUtil.createRefreshTokenCookie(refreshToken).toString());

        // accessToken 헤더 전달
        response.setHeader("Authorization", "Bearer " + accessToken);

        log.info("로그인 성공: userId={}, loginId={}, jti={}", userId, user.getLoginId(), jti);
        return new SignInResponseDto(user.getNickname(), user.getProfileImage());
    }

    // 로그아웃
    public BaseResponseDto<Void> signOut(String refreshToken, HttpServletResponse response) {
        log.info("로그아웃 요청");

        // 토큰 유효성 검사
        if (!jwtUtil.validate(refreshToken)) {
            log.warn("로그아웃 실패 - 유효하지 않은 토큰");
            throw new AuthException(AuthErrorCode.TOKEN_INVALID);
        }

        // 토큰 정보 추출
        Long userId = jwtUtil.getUserId(refreshToken);
        String jti = jwtUtil.getJti(refreshToken);

        // redis 존재 여부 확인
        if (!refreshTokenStore.exists(userId, jti)) {
            log.warn("로그아웃 실패 - Redis에 토큰 없음: userId={}, jti={}", userId, jti);
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_EXPIRED_OR_NOT_FOUND);
        }

        // redis에서 리프레시 토큰 삭제
        refreshTokenStore.delete(userId, jti);

        // 쿠키 삭제
        response.addHeader("Set-Cookie", cookieUtil.deleteRefreshTokenCookie().toString());

        log.info("로그아웃 성공: userId={}, jti={}", userId, jti);
        
        // 응답 반환
        return BaseResponseDto.<Void>builder()
                .message(UserResponseMessages.SIGN_OUT_SUCCESS)
                .build();
    }

    // accessToken 재발금
    public BaseResponseDto<AccessTokenResponseDto> reissue(String refreshToken, HttpServletResponse response) {
        log.info("토큰 재발급 요청");

        if (!StringUtils.hasText(refreshToken)) {
            log.warn("토큰 재발급 실패 - 토큰 없음");
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_NOT_PROVIDED);
        }

        if (!jwtUtil.validate(refreshToken)) {
            log.warn("토큰 재발급 실패 - 유효하지 않은 토큰");
            throw new AuthException(AuthErrorCode.TOKEN_INVALID);
        }

        Long userId = jwtUtil.getUserId(refreshToken);
        String jti = jwtUtil.getJti(refreshToken);

        if (!refreshTokenStore.exists(userId, jti)) {
            log.warn("토큰 재발급 실패 - Redis에 토큰 없음: userId={}, jti={}", userId, jti);
            throw new AuthException(AuthErrorCode.REFRESH_TOKEN_EXPIRED_OR_NOT_FOUND);
        }

        String newAccessToken = jwtUtil.createAccessToken(userId);
        String newJti = UUID.randomUUID().toString();
        String newRefreshToken = jwtUtil.createRefreshToken(userId, newJti);

        Duration ttl = jwtProperties.getRefreshDays();
        refreshTokenStore.delete(userId, jti);
        refreshTokenStore.save(userId, newJti, newRefreshToken, ttl);

        response.addHeader("Set-Cookie", cookieUtil.createRefreshTokenCookie(newRefreshToken).toString());
        response.setHeader("Authorization", "Bearer " + newAccessToken);

        log.info("토큰 재발급 성공: userId={}, oldJti={}, newJti={}", userId, jti, newJti);

        return BaseResponseDto.<AccessTokenResponseDto>builder()
                .message(UserResponseMessages.TOKEN_REISSUE_SUCCESS)
                .content(new AccessTokenResponseDto(newAccessToken))
                .build();
    }

}
