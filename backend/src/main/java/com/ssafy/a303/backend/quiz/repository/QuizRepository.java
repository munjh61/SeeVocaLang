package com.ssafy.a303.backend.quiz.repository;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface QuizRepository extends JpaRepository<QuizEntity, Long> {

    int countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(
            LocalDateTime start,
            LocalDateTime end
    );

    List<QuizEntity> findAllByCreatedAtBetweenOrderByProblemNumberAsc(
            LocalDateTime start,
            LocalDateTime end
    );

    Optional<QuizEntity> findByProblemNumberAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(
            int problemNumber,
            LocalDateTime start,
            LocalDateTime end
    );

}