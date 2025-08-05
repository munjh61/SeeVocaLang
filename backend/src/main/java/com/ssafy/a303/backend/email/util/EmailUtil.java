package com.ssafy.a303.backend.email.util;

import com.ssafy.a303.backend.email.exception.EmailErrorCode;
import com.ssafy.a303.backend.email.exception.EmailSendException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailUtil {

    private final JavaMailSender mailSender;

    public void sendMail(String to, String subject, String htmlBody) {
        try {
            // 단순 텍스트만 지원하는 simplemailmessage보단
            // html 지원 가능한 mimemessage 방식으로 진행 -> 좀 더 있어보임
            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");  // multipart : false

            helper.setTo(to);   // 수신자 세팅
            helper.setSubject(subject); // 제목 설정
            helper.setText(htmlBody, true); // 본문 설정, html 사용 true

            mailSender.send(message);   // 이메일 전송

            log.info("이메일 전송 완료: to={}, subject={}", to, subject);

        } catch (MessagingException e) {
            log.error("이메일 전송 중 예외 발생: {}", e.getMessage(), e);
            throw new EmailSendException(EmailErrorCode.EMAIL_SEND_FAILED);
        }
    }
}
