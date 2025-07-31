package com.ssafy.a303.backend.folder.mapper;

import com.ssafy.a303.backend.folder.dto.*;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FolderMapper {
    FolderMapper INSTANCE = Mappers.getMapper(FolderMapper.class);

    @Mapping(target = "thumbnailUrl", ignore = true)
    ReadFoldersResponseDto toReadFolderResponseDto(FolderEntity entity);

    @Mapping(target = "user", source = "userId")
    FolderEntity toFolderEntity(CreateFolderCommandDto createFolderCommandDto);

    @Mapping(target = "userId", source = "userId")
    CreateFolderCommandDto toCreateFolderCommandDto(CreateFolderRequestDto createFolderRequestDto, long userId);

    @Mapping(target = "userId", source = "userId")
    UpdateFolderCommandDto toUpdateFolderCommandDto(UpdateFolderRequestDto  updateFolderRequestDto, long userId);
}
