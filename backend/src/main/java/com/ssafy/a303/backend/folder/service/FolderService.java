package com.ssafy.a303.backend.folder.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.folder.dto.DeleteFolderCommandDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersCommandDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.dto.UpdateFolderCommandDto;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folder.exception.FolderNotFoundException;
import com.ssafy.a303.backend.folder.repository.FolderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
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

        if (hasNext) {
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

    @Transactional
    public BaseResponseDto<Void> deleteFolder(DeleteFolderCommandDto deleteFolderCommandDto) {
        FolderEntity folder = folderRepository.findById(deleteFolderCommandDto.getFolderId())
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        folder.delete();

        return BaseResponseDto.<Void>builder()
                .message("폴더를 성공적으로 삭제했습니다.")
                .build();
    }

    @Transactional
    public BaseResponseDto<Void> updateFolder(UpdateFolderCommandDto updateFolderCommandDto) {
        FolderEntity folder = folderRepository.findById(updateFolderCommandDto.getFolderId())
                .orElseThrow(() -> new FolderNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        folder.update(updateFolderCommandDto.getDescription(), updateFolderCommandDto.getName());

        return BaseResponseDto.<Void>builder().message("성공적으로 단어장을 수정했습니다.").build();
    }
}
