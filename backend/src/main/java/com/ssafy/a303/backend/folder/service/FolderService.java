package com.ssafy.a303.backend.folder.service;

import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersCommandDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.mapper.FolderMapper;
import com.ssafy.a303.backend.folder.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final FolderRepository folderRepository;

    @Transactional(readOnly = true)
    public PageResponseDto<ReadFoldersResponseDto> getWords(ReadFoldersCommandDto readFoldersCommandDto) {
        List<ReadFoldersResponseDto> folders = folderRepository.findAllByUserId(readFoldersCommandDto.getUserId(),
                readFoldersCommandDto.getLastId(), PageRequest.of(0, readFoldersCommandDto.getSize()));

        boolean hasNext = folders.size() > readFoldersCommandDto.getSize();

        if(hasNext) {
            folders = folders.subList(0, readFoldersCommandDto.getSize());
        }

        long lastId = folders.isEmpty() ? -1 : folders.get(folders.size() - 1).getFolderId();

        return PageResponseDto.<ReadFoldersResponseDto>builder()
                .message("성공적으로 단어장을 불러왔습니다.")
                .content(folders)
                .lastId(lastId)
                .hasNext(hasNext)
                .build();
    }
}
