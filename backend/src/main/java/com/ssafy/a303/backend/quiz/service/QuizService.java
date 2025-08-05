package com.ssafy.a303.backend.quiz.service;

import com.ssafy.a303.backend.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    public int getTodayTotalQuizCount(LocalDateTime currentTime, LocalDateTime endTime) {
        return quizRepository.countByCreatedAtGreaterThanEqualAndCreatedAtLessThan(currentTime, endTime);
    }
}