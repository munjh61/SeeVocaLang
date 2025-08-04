package com.ssafy.a303.backend.word.mapper;

import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.entity.WordEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface WordMapper {
    WordMapper INSTANCE = Mappers.getMapper(WordMapper.class);

    ReadWordResponseDto readWordCommandDto(WordEntity entity);
}
