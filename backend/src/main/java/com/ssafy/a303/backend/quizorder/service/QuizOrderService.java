package com.ssafy.a303.backend.quizorder.service;

import com.ssafy.a303.backend.quizorder.entity.QuizOrderEntity;
import com.ssafy.a303.backend.quizorder.repository.QuizOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizOrderService {

    private final QuizOrderRepository quizOrderRepository;

    public int getLastResolvedQuiz(Long userId, LocalDateTime currentTime, LocalDateTime endTime) {
        Optional<QuizOrderEntity> quizOrder = quizOrderRepository.findTopByUser_UserIdAndQuiz_CreatedAtBetweenOrderByIdDesc(userId, currentTime, endTime);
        return quizOrder.map(quizOrderEntity -> quizOrderEntity.getQuiz().getProblemNumber())
                .orElse(0);
    }
}
