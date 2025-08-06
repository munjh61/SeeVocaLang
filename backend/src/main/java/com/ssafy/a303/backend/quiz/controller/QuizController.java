package com.ssafy.a303.backend.quiz.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResponseDto;
import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResultDto;
import com.ssafy.a303.backend.quiz.mapper.QuizMapper;
import com.ssafy.a303.backend.quiz.service.TodayQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class QuizController {

    private static final String GET_QUIZ_STATUS_SUCCESS_MESSAGE = "오늘의 학습 현황을 성공적으로 조회했습니다.";

    private final TodayQuizService todayQuizService;

    @GetMapping("/api/v1/quiz")
    public ResponseEntity<BaseResponseDto<GetTodayQuizStatusResponseDto>> getTodayQuizStatus(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        LocalDateTime currentTime = LocalDate.now().atStartOfDay();
        GetTodayQuizStatusResultDto resultDto = todayQuizService.getTodayQuizStatus(user.getUserId(), currentTime);
        GetTodayQuizStatusResponseDto responseDto = QuizMapper.INSTANCE.toGetTodayQuizStatusResponseDto(resultDto);
        return ResponseEntity.ok(new BaseResponseDto<>(GET_QUIZ_STATUS_SUCCESS_MESSAGE, responseDto));
    }
}