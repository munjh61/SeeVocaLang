package com.ssafy.a303.backend.folderword.entity;

import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.word.entity.WordEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "folder_word_tb")
public class FolderWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "word_id", nullable = false)
    private WordEntity word;

    @ManyToOne
    @JoinColumn(name = "folder_id", nullable = false)
    private FolderEntity folder;

    @Builder
    public FolderWordEntity(WordEntity word, FolderEntity folder) {
        this.word = word;
        this.folder = folder;
    }
}
