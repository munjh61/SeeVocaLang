package com.ssafy.a303.backend.folder.entity;

import com.ssafy.a303.backend.user.entity.UserEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "folder_tb")
public class FolderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long folderId;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private String description;

    @Column(nullable = false)
    @Setter
    private boolean isFavorite = false;
    @Column(nullable = false)
    private boolean isDefault = false;

    private boolean isDeleted = false;

    public void delete(){
        isDeleted = true;
    }

    public void update(String description, String name){
        this.description =  description;
        this.name =  name;
    }

    @Builder
    public FolderEntity(String name, UserEntity user, String description) {
        this.name = name;
        this.user = user;
        this.description = description;
    }
}
