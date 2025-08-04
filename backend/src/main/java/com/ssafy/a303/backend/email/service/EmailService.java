package com.ssafy.a303.backend.email.service;

import com.ssafy.a303.backend.email.exception.EmailErrorCode;
import com.ssafy.a303.backend.email.exception.EmailSendException;
import com.ssafy.a303.backend.email.exception.EmailVerificationException;
import com.ssafy.a303.backend.email.util.EmailUtil;
import com.ssafy.a303.backend.email.util.RandomCodeGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final EmailUtil emailUtil;
    private final RandomCodeGenerator randomCodeGenerator;
    private final StringRedisTemplate stringRedisTemplate;

    @Value("${email.verification.ttl}")
    private Duration verificationTtl;

    // redis 저장 key 용 prefix
    private static final String PREFIX = "email:verification:";

    // 인증 메일 보내기
    public void sendVerificationCode(String to) {
        // 코드 만들어서 redis 저장
        String code = randomCodeGenerator.generateNumericCode(6);
        String key = PREFIX + to;
        stringRedisTemplate.opsForValue().set(key, code, verificationTtl);

        String subject = "[SVL] 이메일 등록 인증코드 안내";

        String html = "<div style='font-family: sans-serif;'>" +
                "<h2>이메일 인증 요청</h2>" +
                "<p>아래 인증 코드를 입력해 주세요.</p>" +
                "<div style='font-size: 24px; font-weight: bold; color: #2c3e50; margin-top: 10px;'>" +
                code +
                "</div>" +
                "<p style='margin-top: 20px; color: #888;'>본 메일은 5분간 유효합니다.</p>" +
                "</div>";

        emailUtil.sendMail(to, subject, html);
    }

    // 코드 검증
    public void verifyCode(String to, String code) {
        String key = PREFIX + to;
        String savedCode = stringRedisTemplate.opsForValue().get(key);

        if (savedCode == null) {
            log.warn("이메일 인증코드 검증 실패 - 저장된 코드 없음: to={}", to);
            throw new EmailVerificationException(EmailErrorCode.INVALID_VERIFICATION_CODE);
        }

        if (!savedCode.equals(code)) {
            log.warn("이메일 인증코드 검증 실패 - 코드 불일치: to={}, 입력코드={}, 저장코드={}", to, code, savedCode);
            throw new EmailVerificationException(EmailErrorCode.INVALID_VERIFICATION_CODE);
        }

        // 인증 성공하면 코드 삭제
        stringRedisTemplate.delete(key);
    }

    // 임시 비밀번호 보내기
    public void sendTemporaryPassword(String to, String tempPassword) {
        String subject = "[SVL] 임시 비밀번호 발급 안내";

        String html = "<div style='font-family: sans-serif;'>" +
                "<h2>임시 비밀번호 발급</h2>" +
                "<p>임시 비밀번호는 아래와 같습니다.</p>" +
                "<div style='font-size: 24px; font-weight: bold; color: #e74c3c; margin-top: 10px;'>" +
                tempPassword +
                "</div>" +
                "<p style='margin-top: 20px; color: #888;'>로그인 후 반드시 비밀번호를 변경해주세요.</p>" +
                "</div>";

        emailUtil.sendMail(to, subject, html);
    }
}
