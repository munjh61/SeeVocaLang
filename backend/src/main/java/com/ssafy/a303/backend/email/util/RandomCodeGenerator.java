package com.ssafy.a303.backend.email.util;

import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.user.exception.UserException;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class RandomCodeGenerator {

    private static final String UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String DIGITS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*";

    private static final String NUMERIC = DIGITS;
    private static final String ALPHANUMERIC = UPPER + DIGITS;
    private static final String STRONG_SET = UPPER + LOWER + DIGITS + SYMBOLS;

    private static final SecureRandom random = new SecureRandom();

    // 숫자 인증 코드 (이메일 인증)
    public String generateNumericCode(int length) {
        return generateCode(NUMERIC, length);
    }

    // 대/소문자 + 숫자 + 특수문자 조합 (임시 비밀번호)
    public String generateStrongPassword(int length) {
        if (length < 4) {
            throw new UserException(UserErrorCode.INVALID_PASSWORD_FORMAT); // 최소 각 1자 포함 위해
        }

        List<Character> chars = new ArrayList<>();
        chars.add(randomChar(UPPER));
        chars.add(randomChar(LOWER));
        chars.add(randomChar(DIGITS));
        chars.add(randomChar(SYMBOLS));

        for (int i = 4; i < length; i++) {
            chars.add(randomChar(STRONG_SET));
        }

        Collections.shuffle(chars, random);

        return charsToString(chars);
    }

    private String generateCode(String pool, int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(randomChar(pool));
        }
        return sb.toString();
    }

    private char randomChar(String pool) {
        return pool.charAt(random.nextInt(pool.length()));
    }

    private String charsToString(List<Character> chars) {
        StringBuilder sb = new StringBuilder(chars.size());
        for (char c : chars) {
            sb.append(c);
        }
        return sb.toString();
    }
}
