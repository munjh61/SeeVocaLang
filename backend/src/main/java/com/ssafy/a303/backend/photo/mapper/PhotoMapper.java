package com.ssafy.a303.backend.photo.mapper;

import com.ssafy.a303.backend.photo.dto.*;
import com.ssafy.a303.backend.word.entity.WordEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;

@Mapper
public interface PhotoMapper {

    PhotoMapper INSTANCE = Mappers.getMapper(PhotoMapper.class);

    ReadObjectDetectionCommandDto toCommandDto(Long userId, MultipartFile imageFile);

    ReadObjectDetectionResponseDto toResponseDto(ReadObjectDetectionResultDto resultDto);

    CreateWordPhotoCommandDto toCommandDto(Long userId, CreateWordRequestDto requestDto);

    CreateWordResultDto toResultDto(WordEntity entity);

    CreateWordResponseDto toResponseDto(CreateWordResultDto resultDto);
}
