package com.ssafy.a303.backend.folder.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "folder_tb")
public class FolderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long folderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String description;
    private String thumbnail;

    @Column(nullable = false)
    private boolean isFavorite;
    @Column(nullable = false)
    private boolean isDefault;

}
