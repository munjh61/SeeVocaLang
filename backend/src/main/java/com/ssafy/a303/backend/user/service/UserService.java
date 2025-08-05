package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.utility.s3.ImageUploader;
import com.ssafy.a303.backend.common.utility.s3.exception.S3ErrorCode;
import com.ssafy.a303.backend.email.exception.EmailErrorCode;
import com.ssafy.a303.backend.email.exception.EmailSendException;
import com.ssafy.a303.backend.email.service.EmailService;
import com.ssafy.a303.backend.email.util.RandomCodeGenerator;
import com.ssafy.a303.backend.user.dto.ProfileUpdateDto;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.user.exception.UserException;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

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
        Optional<UserEntity> user = userRepository.findById(userId);
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

    // 비밀번호 찾기 -> 이메일 입력
    @Transactional
    public void resetPasswordByEmail(String email) {
        // 유저 조회
        UserEntity user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> {
                    log.warn("비밀번호 재설정 실패 - 사용자 없음: email={}", email);
                    return new UserException(UserErrorCode.USER_NOT_FOUND);
                });

        // 임시 비밀번호 생성
        String tempPassword = randomCodeGenerator.generateStrongPassword(10);

        // 비밀번호 암호화, 저장
        String encryptedPassword = passwordEncoder.encode(tempPassword);
        user.updatePassword(encryptedPassword);

        // 이메일 전송
        emailService.sendTemporaryPassword(email, tempPassword);
    }

    /// 회원 정보 수정
    @Transactional
    public void updateUserInfo(Long userId, ProfileUpdateDto dto, MultipartFile profileImg) {
        // 유저 특정하기
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        /// 닉네임 변경
        if (!user.getNickname().equals(dto.getNickname())) {
            boolean exists = userRepository.existsByNicknameAndIsDeletedFalse(dto.getNickname());

            if (exists) {
                throw new UserException(UserErrorCode.USER_NICKNAME_ALREADY_EXISTS);
            }

            user.updateNickname(dto.getNickname());
        }

        /// 비밀번호 변경
        // 소셜 로그인 유저는 비밀번호 변경 불가
        if (user.isSocialUser()) {
            if (dto.getCurrentPassword() != null || dto.getNewPassword() != null) {
                throw new UserException(CommonErrorCode.FORBIDDEN_REQUEST);
            }
            return;
        } else {

            // 비밀번호 변경 안 하는 경우는 스킵
            if (dto.getCurrentPassword() == null && dto.getNewPassword() == null) {
                return;
            }

            // 하나라도 비어 있으면 예외
            if (dto.getCurrentPassword() == null || dto.getNewPassword() == null) {
                throw new UserException(CommonErrorCode.INVALID_INPUT);
            }

            // 현재 비밀번호 틀림
            if (!user.checkPasswordMatch(dto.getCurrentPassword(), passwordEncoder)) {
                throw new UserException(UserErrorCode.INVALID_CREDENTIALS);
            }

            // 여기까지 통과했으면 변경 진행
            user.updatePassword(passwordEncoder.encode(dto.getNewPassword()));
        }

        /// 프로필 이미지 변경
        if (profileImg != null && !profileImg.isEmpty()) {
            try {
                // 기존 프사 삭제
                if (user.getProfileImage() != null) {
                    imageUploader.delete(userId, "profile");
                }

                // 새 이미지 업로드
                String imageUrl = imageUploader.update(
                        userId,
                        "profile",
                        profileImg.getBytes(),
                        profileImg.getContentType()
                );

                user.updateProfileImage(imageUrl);
            } catch (Exception e) {
                throw new UserException(UserErrorCode.IMAGE_UPLOAD_FAILED);
            }
        }
    }

    @Transactional
    public void deleteUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        // s3에 저장된 프로필 이미지 삭제
        if (user.getProfileImage() != null) {
            imageUploader.delete(userId, "profile");
        }

        user.softDelete();
    }
}
