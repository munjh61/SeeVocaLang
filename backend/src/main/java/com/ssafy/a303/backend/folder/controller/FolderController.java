package com.ssafy.a303.backend.folder.controller;

import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersCommandDto;
import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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


}
