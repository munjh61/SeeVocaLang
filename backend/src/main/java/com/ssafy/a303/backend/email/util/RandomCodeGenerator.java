package com.ssafy.a303.backend.email.util;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class RandomCodeGenerator {
    private static final String NUMERIC = "0123456789";
    private static final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom random = new SecureRandom();
    
    // 숫자만 포함된 인증 코드 -> 이메일 인증용
    public String generateNumericCode(int length) {
        return generateCode(NUMERIC, length);
    }

    // 영문대문자 + 숫자 포함된 인증 코드 -> 임시 비밀번호용
    public String generateAlphanumericCode(int length) {
        return generateCode(ALPHANUMERIC, length);
    }

    private String generateCode(String array, int length) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0 ; i < length ; i++) {
            int idx = random.nextInt(array.length());
            sb.append(array.charAt(idx));
        }
        return sb.toString();
    }
}
