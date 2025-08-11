package com.ssafy.a303.backend.folder.repository;

import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.repository.query.FolderQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FolderRepository extends JpaRepository<FolderEntity, Long>, FolderQueryRepository {

    Optional<FolderEntity> findByFolderIdAndIsDeletedFalse(Long folderId);

}
