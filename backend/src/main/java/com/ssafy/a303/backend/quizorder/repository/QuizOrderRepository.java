package com.ssafy.a303.backend.quizorder.repository;

import com.ssafy.a303.backend.quizorder.entity.QuizOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface QuizOrderRepository extends JpaRepository<QuizOrderEntity, Long> {

    Optional<QuizOrderEntity> findTopByUser_UserIdAndQuiz_CreatedAtBetweenOrderByIdDesc(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    );

}
