package com.ssafy.a303.backend.folder.mapper;

import com.ssafy.a303.backend.folder.dto.*;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.user.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FolderMapper {
    FolderMapper INSTANCE = Mappers.getMapper(FolderMapper.class);

    @Mapping(target = "thumbnailUrl", ignore = true)
    ReadFoldersResponseDto toReadFolderResponseDto(FolderEntity entity);

    UpdateFolderCommandDto toUpdateFolderCommandDto(UpdateFolderRequestDto updateFolderRequestDto, long folderId, long userId);

    FolderEntity toEntity(CreateFolderCommandDto createFolderCommandDto, UserEntity user);

    CreateFolderCommandDto toCreateFolderCommandDto(CreateFolderRequestDto dto, long userId);
}
