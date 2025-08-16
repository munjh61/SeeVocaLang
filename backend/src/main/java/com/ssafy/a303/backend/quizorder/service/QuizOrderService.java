package com.ssafy.a303.backend.quizorder.service;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import com.ssafy.a303.backend.quizorder.entity.QuizOrderEntity;
import com.ssafy.a303.backend.quizorder.repository.QuizOrderRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizOrderService {

    private final QuizOrderRepository quizOrderRepository;

    public int getLastResolvedQuiz(Long userId, LocalDateTime currentTime, LocalDateTime endTime) {
        Optional<QuizOrderEntity> quizOrder = quizOrderRepository.findByUser_UserIdAndQuiz_CreatedAtBetweenOrderByIdDesc(userId, currentTime, endTime);
        return quizOrder.map(quizOrderEntity -> quizOrderEntity.getQuiz().getProblemNumber())
                .orElse(0);
    }

    @Transactional
    public void saveTodayQuizProgress(UserEntity user, QuizEntity quiz) {
        Optional<QuizOrderEntity> lastSolved = quizOrderRepository.findTopByUser(user);
        if (lastSolved.isPresent()) {
            lastSolved.get().updateQuizId(quiz);
        } else {
            quizOrderRepository.save(new QuizOrderEntity(user, quiz));
        }
    }

    private void updateQuizOrder(QuizOrderEntity order, QuizEntity quiz) {
        order.updateQuizId(quiz);
    }

    private void createQuizOrder(UserEntity user, QuizEntity quiz) {
        QuizOrderEntity newOrder = QuizOrderEntity.builder()
                .user(user)
                .quiz(quiz)
                .build();
        quizOrderRepository.save(newOrder);
    }
}