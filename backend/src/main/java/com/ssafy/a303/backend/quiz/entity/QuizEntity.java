package com.ssafy.a303.backend.quiz.entity;

import com.ssafy.a303.backend.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "quiz_tb")
public class QuizEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quizId;

    private int problemNumber;

}
