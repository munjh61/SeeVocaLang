package com.ssafy.a303.backend.photo.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.photo.dto.*;
import com.ssafy.a303.backend.photo.mapper.PhotoMapper;
import com.ssafy.a303.backend.photo.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class PhotoController {

    private static final String UPLOAD_SUCCESS_MESSAGE = "이미지가 성공적으로 업로드되었습니다.";
    private static final String SAVE_WORD_SUCCESS_MESSAGE = "단어가 성공적으로 저장되었습니다.";
    private static final String UPDATE_WORD_SUCCESS_MESSAGE = "단어가 성공적으로 수정되었습니다.";

    private final PhotoService photoService;

    @PostMapping("/api/v1/photos")
    public BaseResponseDto<ReadObjectDetectionResponseDto> readObjectDetection(
            @RequestPart("image") MultipartFile file
    ) {
        // TODO: JWT 토큰 도입 이후에 변경할 예정입니다.
        Long userId = 1L;
        ReadObjectDetectionResultDto resultDto = photoService.readObjectDetection(PhotoMapper.INSTANCE.toCommandDto(userId, file));
        ReadObjectDetectionResponseDto responseDto = PhotoMapper.INSTANCE.toResponseDto(resultDto);
        return new BaseResponseDto<>(UPLOAD_SUCCESS_MESSAGE, responseDto);
    }

}