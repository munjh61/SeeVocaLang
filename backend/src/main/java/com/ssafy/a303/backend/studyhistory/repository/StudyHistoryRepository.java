package com.ssafy.a303.backend.studyhistory.repository;

import com.ssafy.a303.backend.studyhistory.entity.StudyHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface StudyHistoryRepository extends JpaRepository<StudyHistoryEntity, Long> {

    boolean existsByUser_UserIdAndCreatedAtBetween(long userId, LocalDateTime start, LocalDateTime end);

}