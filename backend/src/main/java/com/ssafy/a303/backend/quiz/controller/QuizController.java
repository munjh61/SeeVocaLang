package com.ssafy.a303.backend.quiz.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.quiz.dto.*;
import com.ssafy.a303.backend.quiz.mapper.QuizMapper;
import com.ssafy.a303.backend.quiz.service.TodayQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuizController {

    private static final String GET_QUIZ_STATUS_SUCCESS_MESSAGE = "오늘의 학습 현황을 성공적으로 조회했습니다.";
    private static final String GET_QUIZ_LIST_STATUS_MESSAGE = "오늘의 학습 단어 목록을 성공적으로 조회했습니다.";
    private static final String SAVE_QUIZ_STATUS_MESSAGE = "오늘의 학습 현황을 성공적으로 저장했습니다.";
    private static final String COMPLETE_QUIZ_SUCCESS_MESSAGE = "오늘의 학습을 성공적으로 완료했습니다.";

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

    @GetMapping("/api/v1/quiz/words")
    public ResponseEntity<BaseResponseDto<GetTodayQuizResponseDto>> getTodayQuizItemList(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        LocalDateTime currentTime = LocalDate.now().atStartOfDay();
        List<GetTodayQuizItem> itemList = todayQuizService.getTodayQuizItemList(user.getUserId(), currentTime);
        GetTodayQuizResponseDto responseDto = new GetTodayQuizResponseDto(itemList);
        return ResponseEntity.ok(new BaseResponseDto<>(GET_QUIZ_LIST_STATUS_MESSAGE, responseDto));
    }

    @PutMapping("/api/v1/quiz")
    public ResponseEntity<BaseResponseDto<Void>> saveTodayQuizProgress(
            @RequestBody UpdateTodayQuizRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        Long userId = user.getUserId();
        LocalDateTime currentTime = LocalDate.now().atStartOfDay();
        UpdateTodayQuizCommandDto commandDto = QuizMapper.INSTANCE.toUpdateTodayQuizCommandDto(userId, requestDto.quizNumber(), currentTime);
        todayQuizService.saveTodayQuizProgress(commandDto);
        return ResponseEntity.ok(new BaseResponseDto<>(SAVE_QUIZ_STATUS_MESSAGE, null));
    }

    @PostMapping("/api/v1/completion-quiz")
    public ResponseEntity<BaseResponseDto<Void>> completeQuiz(
            @AuthenticationPrincipal CustomUserDetails user
    ) {
        Long userId = user.getUserId();
        LocalDateTime currentTime = LocalDate.now().atStartOfDay();
        todayQuizService.completeTodayQuiz(userId, currentTime);
        return ResponseEntity.ok(new BaseResponseDto<>(COMPLETE_QUIZ_SUCCESS_MESSAGE, null));
    }
}