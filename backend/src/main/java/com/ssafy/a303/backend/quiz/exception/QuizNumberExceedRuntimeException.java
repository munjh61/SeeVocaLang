package com.ssafy.a303.backend.quiz.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class QuizNumberExceedRuntimeException extends SVLRuntimeException {

  public QuizNumberExceedRuntimeException() {
    super(QuizErrorCode.EXCEED_TODAY_QUIZ_TOTAL_COUNT);
  }

}