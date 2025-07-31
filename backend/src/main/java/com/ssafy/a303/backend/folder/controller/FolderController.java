package com.ssafy.a303.backend.folder.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.folder.dto.*;
import com.ssafy.a303.backend.folder.mapper.FolderMapper;
import com.ssafy.a303.backend.folder.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FolderController {
    private final FolderService folderService;

    @GetMapping("/api/v1/folders/{userId}")
    public ResponseEntity<PageResponseDto<ReadFoldersResponseDto>> getFolders(@PathVariable long userId,
                                                                              @RequestParam(defaultValue = "-1") long lastId) {
        PageResponseDto<ReadFoldersResponseDto> response = folderService.getWords(ReadFoldersCommandDto
                .builder()
                .lastId(lastId)
                .size(10)
                .userId(userId)
                .build());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/b1/folders/{folderId}")
    public ResponseEntity<BaseResponseDto<Void>> deleteFolder(@PathVariable long folderId) {
        BaseResponseDto<Void> response = folderService.deleteFolder(DeleteFolderCommandDto.builder()
                .folderId(folderId)
                .userId(1L)
                .build());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/b1/folders/{folderId}")
    public ResponseEntity<BaseResponseDto<Void>> updateFolder(@PathVariable long folderId,
                                                              @RequestBody UpdateFolderRequestDto updateFolderRequestDto) {
        BaseResponseDto<Void> response = folderService.updateFolder(FolderMapper.INSTANCE
                .toUpdateFolderCommandDto(updateFolderRequestDto, 1L));

        return ResponseEntity.ok(response);
    }
}
