package com.ssafy.a303.backend.common.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SVLRuntimeException.class)
    public ResponseEntity<String> handleSVLRuntimeException(SVLRuntimeException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        int statusCode = errorCode.getStatusCode();
        String message = errorCode.getMessage();
        return ResponseEntity.status(statusCode).body(message);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        String message = exception.getMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> handleConstraintViolationException(MethodArgumentNotValidException exception) {
        String message = exception.getMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

}