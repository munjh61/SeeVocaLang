package com.ssafy.a303.backend.quiz.repository;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface QuizRepository extends JpaRepository<QuizEntity, Long> {

    int countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(
            LocalDateTime start,
            LocalDateTime end
    );

}
