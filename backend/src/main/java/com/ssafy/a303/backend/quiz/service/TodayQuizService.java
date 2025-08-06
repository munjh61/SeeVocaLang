package com.ssafy.a303.backend.quiz.service;

import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResultDto;
import com.ssafy.a303.backend.quizorder.service.QuizOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TodayQuizService {

    private final QuizService quizService;
    private final QuizOrderService quizOrderService;

    public GetTodayQuizStatusResultDto getTodayQuizStatus(Long userId, LocalDateTime currentTime) {
        LocalDateTime endTime = currentTime.plusDays(1).minusNanos(1);
        int lastSolvedNumber = quizOrderService.getLastResolvedQuiz(userId, currentTime, endTime);
        int totalProblemCount = quizService.getTodayTotalQuizCount(currentTime, endTime);
        return new GetTodayQuizStatusResultDto(lastSolvedNumber, totalProblemCount);
    }

}
