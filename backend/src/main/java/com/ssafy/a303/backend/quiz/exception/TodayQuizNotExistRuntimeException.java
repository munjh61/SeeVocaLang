package com.ssafy.a303.backend.quiz.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class TodayQuizNotExistRuntimeException extends SVLRuntimeException {
    public TodayQuizNotExistRuntimeException() {
        super(QuizErrorCode.TODAY_QUIZ_NOT_FOUND);
    }
}
