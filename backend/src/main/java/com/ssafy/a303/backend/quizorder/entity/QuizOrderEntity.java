package com.ssafy.a303.backend.quizorder.entity;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "quiz_order_tb")
public class QuizOrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private QuizEntity quiz;

    public void updateQuizId(QuizEntity quiz) {
        this.quiz = quiz;
    }

    @Builder
    public QuizOrderEntity(UserEntity user, QuizEntity quiz) {
        this.user = user;
        this.quiz = quiz;
    }
}
