package com.ssafy.a303.backend.quiz.entity;

import com.ssafy.a303.backend.common.entity.BaseEntity;
import com.ssafy.a303.backend.word.entity.WordEntity;
import jakarta.persistence.*;
import lombok.Builder;
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

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private WordEntity word;

    @Builder
    public QuizEntity(int problemNumber, WordEntity word) {
        this.problemNumber = problemNumber;
        this.word = word;
    }
}