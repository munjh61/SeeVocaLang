package com.ssafy.a303.backend.studyhistory.service;

import com.ssafy.a303.backend.quiz.exception.QuizAlreadyCompleteRuntimeException;
import com.ssafy.a303.backend.studyhistory.entity.StudyHistoryEntity;
import com.ssafy.a303.backend.studyhistory.repository.StudyHistoryRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StudyHistoryService {

    private final StudyHistoryRepository studyHistoryRepository;

    public void completeTodayQuiz(UserEntity user, LocalDateTime currentTime, LocalDateTime endTime) {
        if (studyHistoryRepository.existsByUser_UserIdAndCreatedAtBetween(user.getUserId(), currentTime, endTime))
            throw new QuizAlreadyCompleteRuntimeException();

        StudyHistoryEntity studyHistoryEntity = new StudyHistoryEntity(user);
        studyHistoryRepository.save(studyHistoryEntity);
    }

    public LocalDateTime getLastCompletedQuizTime(Long userId) {
        return studyHistoryRepository.findTopByUser_UserIdOrderByIdDesc(userId).getCreatedAt();
    }

}
