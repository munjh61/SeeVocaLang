package com.ssafy.a303.backend.studyhistory.repository;

import com.ssafy.a303.backend.studyhistory.entity.StudyHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface StudyHistoryRepository extends JpaRepository<StudyHistoryEntity, Long> {

    boolean existsByUser_UserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);

    StudyHistoryEntity findTopByUser_UserIdOrderByStudyHistoryIdDesc(Long userId);

    List<StudyHistoryEntity> findAllByUser_UserIdAndCreatedAtBetween(Long userId, LocalDateTime start, LocalDateTime end);
}