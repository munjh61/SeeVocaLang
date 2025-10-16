package com.ssafy.a303.backend.photo.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
<<<<<<< HEAD
import com.ssafy.a303.backend.common.security.CustomUserDetails;
=======
>>>>>>> origin/be/feat-fast-api
import com.ssafy.a303.backend.photo.dto.*;
import com.ssafy.a303.backend.photo.mapper.PhotoMapper;
import com.ssafy.a303.backend.photo.service.PhotoService;
import lombok.RequiredArgsConstructor;
<<<<<<< HEAD
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

=======
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

>>>>>>> origin/be/feat-fast-api
@RestController
@RequiredArgsConstructor
public class PhotoController {

    private static final String UPLOAD_SUCCESS_MESSAGE = "이미지가 성공적으로 업로드되었습니다.";
    private static final String SAVE_WORD_SUCCESS_MESSAGE = "단어가 성공적으로 저장되었습니다.";
<<<<<<< HEAD
    private static final String UPDATE_WORD_IMAGE_SUCCESS_MESSAGE = "단어 이미지가 성공적으로 수정되었습니다.";
    private static final String UPDATE_WORD_SUCCESS_MESSAGE = "단어가 성공적으로 수정되었습니다.";
    private static final String GET_FOLDERS_CONTAINING_WORDS_SUCCESS_MESSAGE = "단어를 저장가능한 폴더 목록을 성공적으로 조회했습니다.";
=======
    private static final String UPDATE_WORD_SUCCESS_MESSAGE = "단어가 성공적으로 수정되었습니다.";
>>>>>>> origin/be/feat-fast-api

    private final PhotoService photoService;

    @PostMapping("/api/v1/photos")
<<<<<<< HEAD
    public BaseResponseDto<ReadObjectDetectionResponseDto> readObjectDetection(
            @RequestPart("image") MultipartFile file,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        Long userId = customUserDetails.getUserId();
=======
    public BaseResponseDto<ReadObjectDetectionResponseDto> readObjectDetection(@RequestPart("image") MultipartFile file) {
        // TODO: JWT 토큰 도입 이후에 변경할 예정입니다.
        Long userId = 1L;
>>>>>>> origin/be/feat-fast-api
        ReadObjectDetectionResultDto resultDto = photoService.readObjectDetection(PhotoMapper.INSTANCE.toCommandDto(userId, file));
        ReadObjectDetectionResponseDto responseDto = PhotoMapper.INSTANCE.toResponseDto(resultDto);
        return new BaseResponseDto<>(UPLOAD_SUCCESS_MESSAGE, responseDto);
    }

    @PostMapping("/api/v1/photos/words")
<<<<<<< HEAD
    public ResponseEntity<BaseResponseDto<CreateWordResponseDto>> createWord(
            @RequestBody CreateWordRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        Long userId = customUserDetails.getUserId();
        CreateWordResultDto resultDto = photoService.createWord(PhotoMapper.INSTANCE.toCommandDto(userId, requestDto));
        CreateWordResponseDto responseDto = PhotoMapper.INSTANCE.toResponseDto(resultDto);
        return ResponseEntity.ok(new BaseResponseDto<>(SAVE_WORD_SUCCESS_MESSAGE, responseDto));
    }

    @PutMapping("/api/v1/photos/words/{wordId}/image")
    public BaseResponseDto<Void> updateWordImage(
        @PathVariable Long wordId,
        @RequestBody UpdateWordImageRequestDto requestDto,
        @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId = userDetails.getUserId();
        UpdateWordImageCommandDto commandDto = new UpdateWordImageCommandDto(wordId, userId, requestDto.imageKey());
        photoService.updateWordImage(commandDto);
        return BaseResponseDto.<Void>builder()
                .message(UPDATE_WORD_IMAGE_SUCCESS_MESSAGE)
                .build();
    }

    @PutMapping("/api/v1/photos/words/{wordId}")
    public BaseResponseDto<Void> updateWord(
            @PathVariable Long wordId,
            @RequestBody UpdateWordRequestDto requestDto,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        Long userId = customUserDetails.getUserId();
        List<Long> folders = requestDto.folders();
        UpdatePhotoWordCommandDto commandDto = new UpdatePhotoWordCommandDto(userId, wordId, requestDto.imageKey(), folders);
        photoService.updateWord(commandDto);
        return BaseResponseDto.<Void>builder()
                .message(UPDATE_WORD_SUCCESS_MESSAGE)
                .build();
    }

    @GetMapping("/api/v1/photos/words/{wordId}/folders")
    public ResponseEntity<BaseResponseDto<GetFoldersContainingWordsResponseDto>> getFoldersContainingWords(
            @PathVariable Long wordId,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        Long userId =  userDetails.getUserId();
        List<GetFoldersContainingWordsItemDto> folders = photoService.getFoldersContainingWordsList(userId, wordId);
        GetFoldersContainingWordsResponseDto responseDto = new GetFoldersContainingWordsResponseDto(folders);
        return ResponseEntity.ok(new BaseResponseDto<>(GET_FOLDERS_CONTAINING_WORDS_SUCCESS_MESSAGE, responseDto));
    }

=======
    public BaseResponseDto<> createWord(
            @RequestBody CreateWordRequestDto requestDto
    ) {
        // TODO: JWT 토큰 도입 이후에 변경할 예정입니다.
        Long userId = 1L;
        photoService.createWord(PhotoMapper.INSTANCE.toCommandDto(userId, requestDto));
        return new BaseResponseDto<>(SAVE_WORD_SUCCESS_MESSAGE, null);
    }

    @PutMapping("/api/v1/photos/words/{wordId}")
    public BaseResponseDto<> updateWord(
            @PathVariable Long wordId,
            @RequestBody UpdateWordRequestDto requestDto
    ) {
        Long userId = 1L;
        photoService.updateWord(new UpdatePhotoWordCommandDto(userId, wordId, requestDto.imageKey()));
        return new BaseResponseDto<>(UPDATE_WORD_SUCCESS_MESSAGE, null);
    }
>>>>>>> origin/be/feat-fast-api
}