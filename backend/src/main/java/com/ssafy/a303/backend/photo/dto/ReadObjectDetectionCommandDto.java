package com.ssafy.a303.backend.photo.dto;

import org.springframework.web.multipart.MultipartFile;

public record ReadObjectDetectionCommandDto(
   Long userId,
   MultipartFile imageFile
) {}