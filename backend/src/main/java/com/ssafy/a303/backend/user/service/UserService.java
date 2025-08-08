package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.utility.s3.ImageUploader;
import com.ssafy.a303.backend.email.exception.EmailErrorCode;
import com.ssafy.a303.backend.email.exception.EmailSendException;
import com.ssafy.a303.backend.email.service.EmailService;
import com.ssafy.a303.backend.email.util.RandomCodeGenerator;
import com.ssafy.a303.backend.user.dto.*;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.user.exception.UserException;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.mapper.UserMapper;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final RandomCodeGenerator randomCodeGenerator;
    private final PasswordEncoder passwordEncoder;
    private final ImageUploader imageUploader;

    public Optional<UserEntity> getUser(Long userId) {
        Optional<UserEntity> user = userRepository.findByUserIdAndIsDeletedFalse(userId);
        if (user.isEmpty()) {
            log.warn("사용자 조회 실패 - 사용자 없음: userId={}", userId);
        }
        return user;
    }

    public void sendEmailVerificationCode(Long userId, String email) {
        if (userRepository.existsByEmailAndIsDeletedFalse(email)) {
            log.warn("이메일 인증코드 전송 실패 - 이메일 중복: email={}", email);
            throw new EmailSendException(EmailErrorCode.EMAIL_ALREADY_EXISTS);
        }
        emailService.sendVerificationCode(email);
    }

    public void verifyEmailCode(Long userId, String email, String code) {
        emailService.verifyCode(email, code);

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.error("이메일 인증 실패 - 사용자 없음: userId={}", userId);
                    return new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND);
                });

        user.updateEmail(email);
        userRepository.save(user);
    }

    @Transactional
    public void resetPasswordByEmail(String email) {
        UserEntity user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> {
                    log.warn("비밀번호 재설정 실패 - 사용자 없음: email={}", email);
                    return new UserException(UserErrorCode.USER_NOT_FOUND);
                });

        String tempPassword = randomCodeGenerator.generateStrongPassword(10);
        user.updatePassword(passwordEncoder.encode(tempPassword));

        emailService.sendTemporaryPassword(email, tempPassword);
    }

    @Transactional
    public void updateUserInfo(Long userId, ProfileUpdateDto dto, MultipartFile profileImg) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        updateNickname(user, dto.getNickname());
        updatePassword(user, dto.getCurrentPassword(), dto.getNewPassword());
        updateProfileImage(user, userId, profileImg);
    }

    private void updateNickname(UserEntity user, String newNickname) {
        if (user.getNickname().equals(newNickname)) return;

        if (userRepository.existsByNicknameAndIsDeletedFalse(newNickname)) {
            throw new UserException(UserErrorCode.USER_NICKNAME_ALREADY_EXISTS);
        }

        user.updateNickname(newNickname);
    }

    private void updatePassword(UserEntity user, String currentPassword, String newPassword) {
        // 소셜 로그인 -> 비번 변경 X
        if (user.isSocialUser()) {
            if (currentPassword != null || newPassword != null) {
                throw new UserException(CommonErrorCode.FORBIDDEN_REQUEST);
            }
            return;
        }

        // 소셜로그인은 아닌데 안 되는 경우들...
        if (!StringUtils.hasText(currentPassword) && !StringUtils.hasText(newPassword)) return;

        if (!StringUtils.hasText(currentPassword) || !StringUtils.hasText(newPassword)) {
            throw new UserException(CommonErrorCode.INVALID_INPUT);
        }

        if (!user.checkPasswordMatch(currentPassword, passwordEncoder)) {
            throw new UserException(UserErrorCode.INVALID_CREDENTIALS);
        }

        // 여기까지 무사통과 -> 변경 가능
        user.updatePassword(passwordEncoder.encode(newPassword));
    }

    private void updateProfileImage(UserEntity user, Long userId, MultipartFile profileImg) {
        if (profileImg == null || profileImg.isEmpty()) return;

        try {
            String imageUrl = imageUploader.update(
                    userId,
                    "profile",
                    profileImg.getBytes(),
                    profileImg.getContentType()
            );
            user.updateProfileImage(imageUrl);
        } catch (Exception e) {
            log.error("프로필 이미지 업데이트 실패", e);
            throw new UserException(UserErrorCode.IMAGE_UPLOAD_FAILED);
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        if (user.getProfileImage() != null) {
            imageUploader.delete(userId, "profile");
        }

        user.softDelete();
    }

    // 현재 비밀번호 일치하는지 확인
    public boolean validatePassword(Long userId, String password) {
        UserEntity user = getUser(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        // 소셜 로그인 유저 빼기
        if (user.isSocialUser()) {
            return false;
        }

        return user.checkPasswordMatch(password, passwordEncoder);
    }

    public GetStatisticsResultDto getStatistics(GetStatisticsCommandDto commandDto) {
        Long userId = commandDto.userId();
        LocalDateTime startTime = commandDto.startTime();
        LocalDateTime endTime = commandDto.endTime();
        UserMonthlyStatsDto dto = userRepository.findUserMonthlyStats(userId, startTime, endTime);
        return UserMapper.INSTANCE.toResultDto(dto);
    }
}
