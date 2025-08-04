package com.ssafy.a303.backend.folder.repository;

import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.repository.query.FolderQueryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<FolderEntity, Long>, FolderQueryRepository {

    Page<FolderEntity> findByUserUserIdOrderByFolderIdDesc(long userId, Pageable pageable);
}
