package com.ssafy.a303.backend.folder.repository.query;

import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.photo.dto.GetFoldersContainingWordsItemDto;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;

import java.util.List;

public interface FolderQueryRepository {
    List<ReadFoldersResponseDto> findAllByUserId(long userId, boolean favorite);

    List<ReadWordResponseDto> getWordsByFolderId(long folderId);

    boolean deleteWordsByFolderId(long folderId, long wordId);

    List<GetFoldersContainingWordsItemDto> getFoldersContainingWordsList(Long userId, Long wordId);
}
