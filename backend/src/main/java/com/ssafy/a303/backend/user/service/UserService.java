package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.email.exception.EmailErrorCode;
import com.ssafy.a303.backend.email.exception.EmailSendException;
import com.ssafy.a303.backend.email.service.EmailService;
import com.ssafy.a303.backend.email.util.RandomCodeGenerator;
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

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final RandomCodeGenerator randomCodeGenerator;
    private final PasswordEncoder passwordEncoder;

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

}
