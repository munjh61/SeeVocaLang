package com.ssafy.a303.backend.quiz.service;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import com.ssafy.a303.backend.quiz.exception.TodayQuizNotExistRuntimeException;
import com.ssafy.a303.backend.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    public QuizEntity getQuiz(int quizNumber, LocalDateTime currentTime, LocalDateTime endTime) {
        return quizRepository.findByProblemNumberAndCreatedAtGreaterThanEqualAndCreatedAtLessThan(quizNumber, currentTime, endTime)
                .orElseThrow(TodayQuizNotExistRuntimeException::new);
    }

    public int getTodayTotalQuizCount(LocalDateTime currentTime, LocalDateTime endTime) {
        return quizRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(currentTime, endTime);
    }

    public List<QuizEntity> getTodayQuizList(LocalDateTime startTime, LocalDateTime endTime) {
        return quizRepository.findAllByCreatedAtBetweenOrderByProblemNumberAsc(startTime, endTime);
    }
}