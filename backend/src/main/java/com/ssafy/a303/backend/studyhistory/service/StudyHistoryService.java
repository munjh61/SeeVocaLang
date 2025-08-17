package com.ssafy.a303.backend.studyhistory.service;

import com.ssafy.a303.backend.quiz.exception.QuizAlreadyCompleteRuntimeException;
import com.ssafy.a303.backend.studyhistory.dto.GetStudyDaysCommandDto;
import com.ssafy.a303.backend.studyhistory.entity.StudyHistoryEntity;
import com.ssafy.a303.backend.studyhistory.repository.StudyHistoryRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;

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

    public Optional<StudyHistoryEntity> getLastCompletedQuizTime(Long userId) {
        return studyHistoryRepository.findTopByUser_UserIdOrderByStudyHistoryIdDesc(userId);
    }

    public List<LocalDateTime> getStudyDays(GetStudyDaysCommandDto commandDto) {
        YearMonth yearMonth = YearMonth.of(commandDto.year(), commandDto.month());
        LocalDateTime start = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime end   = yearMonth.plusMonths(1).atDay(1).atStartOfDay();

        return studyHistoryRepository.findAllByUser_UserIdAndCreatedAtBetween(commandDto.userId(), start, end)
                .stream()
                .map(StudyHistoryEntity::getCreatedAt)
                .toList();
    }

}
