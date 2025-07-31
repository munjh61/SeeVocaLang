package com.ssafy.a303.backend.folder.repository.query;

import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FolderQueryRepository {
    List<ReadFoldersResponseDto> findAllByUserId(long userId, long folderId, Pageable pageable);
}
