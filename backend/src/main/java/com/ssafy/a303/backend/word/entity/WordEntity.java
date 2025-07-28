package com.ssafy.a303.backend.word.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "word_tb")
public class WordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long wordId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(nullable = false)
    private String nameEn;
    @Column(nullable = false)
    private String nameKo;

    @Column(nullable = false)
    private String imageUrl;
    private String audioUrl;
}
