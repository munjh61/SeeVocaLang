package com.ssafy.a303.backend.folderword.repository;

import com.ssafy.a303.backend.folderword.entity.FolderWordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderWordRepository extends JpaRepository<FolderWordEntity, Long> {
}
