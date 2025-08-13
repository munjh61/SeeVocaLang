package com.ssafy.a303.backend.word.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Builder;
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

    private boolean isDeleted = false;

    @Column(nullable = false)
    private int folderCount = 0;

    public void increment(int num){
        this.folderCount += num;
    }

    public void delete() {
        isDeleted = true;
    }

    public void updateImageUrl(String url) { this.imageUrl = url; }

    @Builder
    public WordEntity(UserEntity user, String nameEn, String nameKo, String imageUrl, String audioUrl) {
        this.user = user;
        this.nameEn = nameEn;
        this.nameKo = nameKo;
        this.imageUrl = imageUrl;
        this.audioUrl = audioUrl;
    }
}
