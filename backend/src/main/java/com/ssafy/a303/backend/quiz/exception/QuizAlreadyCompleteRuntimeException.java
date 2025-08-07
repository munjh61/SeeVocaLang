package com.ssafy.a303.backend.quiz.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class QuizAlreadyCompleteRuntimeException extends SVLRuntimeException {
  public QuizAlreadyCompleteRuntimeException() {
    super(QuizErrorCode.USER_ALREADY_COMPLETE_TODAY_QUIZ);
  }
}
