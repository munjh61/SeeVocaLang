package com.ssafy.a303.backend.quiz.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum QuizErrorCode implements ErrorCode {
    USER_ALREADY_COMPLETE_TODAY_QUIZ(400, "이미 오늘의 학습을 완료했습니다."),
    EXCEED_TODAY_QUIZ_TOTAL_COUNT(400, "저장할 퀴즈 번호가 오늘 학습할 퀴즈 수를 초과했습니다."),
    TODAY_QUIZ_NOT_FOUND(500, "오늘의 학습 단어가 서버에 존재하지 않습니다.");

    private final int statusCode;
    private final String message;

    @Override
    public int getStatusCode() {
        return this.statusCode;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
