package com.ssafy.a303.backend.friend.mapper;

import com.ssafy.a303.backend.friend.dto.ReadFriendResponseDto;
import com.ssafy.a303.backend.user.entity.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FriendMapper {
    FriendMapper INSTANCE = Mappers.getMapper(FriendMapper.class);

    ReadFriendResponseDto readPendingFriendResponseDto(UserEntity user);
}
