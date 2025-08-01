package com.ssafy.a303.backend.folder.repository.query;

import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FolderQueryRepository {
    List<ReadFoldersResponseDto> findAllByUserId(long userId, long folderId, Pageable pageable);

    List<ReadWordResponseDto> findAllWordsByFolderId(long folderId, long wordId, Pageable pageable);
}
