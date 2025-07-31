package com.ssafy.a303.backend.folder.mapper;

import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.entity.FolderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FolderMapper {
    FolderMapper INSTANCE = Mappers.getMapper(FolderMapper.class);

    @Mapping(target = "thumbnailUrl", ignore = true)
    ReadFoldersResponseDto toReadFolderResponseDto(FolderEntity entity);
}
