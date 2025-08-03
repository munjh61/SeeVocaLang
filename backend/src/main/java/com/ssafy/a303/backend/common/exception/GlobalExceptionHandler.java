package com.ssafy.a303.backend.common.exception;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import io.jsonwebtoken.JwtException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(SVLRuntimeException.class)
    public ResponseEntity<ErrorResponse> handleSVLRuntimeException(SVLRuntimeException exception) {
        int statusCode = exception.getErrorCode().getStatusCode();
        String message = exception.getMessage();
        
        log.error("SVLRuntimeException 발생: statusCode={}, message={}", statusCode, message, exception);
        
        ErrorResponse response = new ErrorResponse(message);
        return ResponseEntity.status(statusCode).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        log.warn("MethodArgumentNotValidException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.INVALID_INPUT.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(ConstraintViolationException exception) {
        log.warn("ConstraintViolationException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.INVALID_INPUT.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {
        log.warn("MethodArgumentTypeMismatchException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.INVALID_INPUT.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Spring Security 관련 예외 처리
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException exception) {
        log.warn("AuthenticationException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.AUTHORIZATION_REQUIRED.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException exception) {
        log.warn("BadCredentialsException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.INVALID_INPUT.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException exception) {
        log.warn("AccessDeniedException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.FORBIDDEN_REQUEST.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    // JWT 관련 예외 처리
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<ErrorResponse> handleJwtException(JwtException exception) {
        log.warn("JwtException 발생: {}", exception.getMessage());
        ErrorResponse response = new ErrorResponse(CommonErrorCode.TOKEN_INVALID.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // 기타 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception exception) {
        log.error("예상치 못한 예외 발생: {}", exception.getMessage(), exception);
        ErrorResponse response = new ErrorResponse(CommonErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}