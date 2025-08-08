package com.ssafy.a303.backend.user.mapper;

import com.ssafy.a303.backend.user.dto.GetStatisticsResponseDto;
import com.ssafy.a303.backend.user.dto.GetStatisticsResultDto;
import com.ssafy.a303.backend.user.dto.UserMonthlyStatsDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    GetStatisticsResultDto toResultDto(UserMonthlyStatsDto dto);

    GetStatisticsResponseDto toResponseDto(GetStatisticsResultDto dto);

}
