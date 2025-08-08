package com.ssafy.a303.backend.studyhistory.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "study_history_tb")
public class StudyHistoryEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studyHistoryId;

    @ManyToOne
    private UserEntity user;

    public StudyHistoryEntity(UserEntity user) {
        this.user = user;
    }

}
