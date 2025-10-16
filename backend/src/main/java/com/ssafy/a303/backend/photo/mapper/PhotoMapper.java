package com.ssafy.a303.backend.photo.mapper;

<<<<<<< HEAD
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.photo.dto.*;
import com.ssafy.a303.backend.word.dto.CreateWordCommandDto;
import com.ssafy.a303.backend.word.entity.WordEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

=======
import com.ssafy.a303.backend.photo.dto.*;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.web.multipart.MultipartFile;

>>>>>>> origin/be/feat-fast-api
@Mapper
public interface PhotoMapper {

    PhotoMapper INSTANCE = Mappers.getMapper(PhotoMapper.class);

    ReadObjectDetectionCommandDto toCommandDto(Long userId, MultipartFile imageFile);

    ReadObjectDetectionResponseDto toResponseDto(ReadObjectDetectionResultDto resultDto);

    CreateWordPhotoCommandDto toCommandDto(Long userId, CreateWordRequestDto requestDto);
<<<<<<< HEAD

    @Mapping(source = "folderId", target = "folderId")
    @Mapping(source = "name", target = "name")
    CreateWordFolderItemDto toCreateWordFolderItemDto(FolderEntity folderEntity);

    @Mapping(source = "wordEntity.wordId", target = "wordId")
    @Mapping(source = "wordEntity.nameEn", target = "nameEn")
    @Mapping(source = "wordEntity.nameKo", target = "nameKo")
    @Mapping(source = "wordEntity.imageUrl", target = "imageUrl")
    @Mapping(source = "folders", target = "folders")
    CreateWordResultDto toCreateWordResultDto(
            WordEntity wordEntity,
            List<CreateWordFolderItemDto> folders
    );

    CreateWordResponseDto toResponseDto(CreateWordResultDto resultDto);
=======
>>>>>>> origin/be/feat-fast-api
}
