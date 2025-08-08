package com.ssafy.a303.backend.folder.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.folder.dto.*;
import com.ssafy.a303.backend.folder.mapper.FolderMapper;
import com.ssafy.a303.backend.folder.service.FolderService;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FolderController {
    private final FolderService folderService;

    @GetMapping("/api/v1/folders/{userId}")
    public ResponseEntity<PageResponseDto<ReadFoldersResponseDto>> getFolders(@PathVariable long userId) {
        PageResponseDto<ReadFoldersResponseDto> response = folderService.getFolders(ReadFoldersCommandDto
                .builder()
                .size(10)
                .userId(userId)
                .build());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/folders/{folderId}/words")
    public ResponseEntity<PageResponseDto<ReadWordResponseDto>> getFolderWords(@PathVariable long folderId) {
        PageResponseDto<ReadWordResponseDto> response = folderService.getWordsByFolderId(ReadFolderWordCommandDto
                .builder()
                .folderId(folderId)
                .build());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/folders")
    public ResponseEntity<BaseResponseDto<Long>> createFolder(@RequestBody CreateFolderRequestDto createFolderRequestDto,
                                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        BaseResponseDto<Long> response = folderService.createFolder(FolderMapper
                .INSTANCE
                .toCreateFolderCommandDto(createFolderRequestDto, userDetails.getUserId()));

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/api/v1/folders/{folderId}")
    public ResponseEntity<BaseResponseDto<Void>> deleteFolder(@PathVariable long folderId,
                                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        BaseResponseDto<Void> response = folderService.deleteFolder(DeleteFolderCommandDto.builder()
                .folderId(folderId)
                .userId(userDetails.getUserId())
                .build());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/api/v1/folders/{folderId}")
    public ResponseEntity<BaseResponseDto<Void>> updateFolder(@PathVariable long folderId,
                                                              @RequestBody UpdateFolderRequestDto updateFolderRequestDto,
                                                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        BaseResponseDto<Void> response = folderService.updateFolder(FolderMapper.INSTANCE
                .toUpdateFolderCommandDto(updateFolderRequestDto, folderId, userDetails.getUserId()));

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/v1/folders/{folderId}/words")
    public ResponseEntity<BaseResponseDto<Void>> deleteFolderWords(@PathVariable long folderId,
                                                                   @RequestBody DeleteFolderWordsRequestDto deleteFolderWordsRequestDto) {
        BaseResponseDto<Void> response = folderService.deleteFolderWords(DeleteFolderWordsCommandDto
                .builder()
                .folderId(folderId)
                .wordIds(deleteFolderWordsRequestDto.getWordIds())
                .build());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v1/folders/favorites")
    public ResponseEntity<PageResponseDto<ReadFoldersResponseDto>> getFavorites(@AuthenticationPrincipal CustomUserDetails userDetails) {
        PageResponseDto<ReadFoldersResponseDto> response = folderService.getFavorites(userDetails.getUserId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v1/folders/{folderId}/favorites")
    public ResponseEntity<BaseResponseDto<Void>> registerFavorite(@PathVariable long folderId) {
        BaseResponseDto<Void> response = folderService.updateFavorite(folderId, true);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/api/v1/folders/{folderId}/favorites")
    public ResponseEntity<BaseResponseDto<Void>> removeFavorite(@PathVariable long folderId) {
        BaseResponseDto<Void> response = folderService.updateFavorite(folderId, false);

        return ResponseEntity.ok(response);
    }
}
