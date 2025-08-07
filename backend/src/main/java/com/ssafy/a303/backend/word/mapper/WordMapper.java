package com.ssafy.a303.backend.word.mapper;

import com.ssafy.a303.backend.word.dto.CardGamePhotoDto;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.entity.WordEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface WordMapper {
    WordMapper INSTANCE = Mappers.getMapper(WordMapper.class);

    ReadWordResponseDto readWordCommandDto(WordEntity entity);
    
    @Mapping(source = "imageUrl", target = "s3ImageUrl")
    @Mapping(source = "nameEn", target = "eng")
    @Mapping(source = "audioUrl", target = "audio")
    CardGamePhotoDto toCardGamePhotoDto(WordEntity entity);
}
