package com.ssafy.a303.backend.friend.service;

import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.friend.dto.ReadFriendResponseDto;
import com.ssafy.a303.backend.friend.entity.FriendStatus;
import com.ssafy.a303.backend.friend.mapper.FriendMapper;
import com.ssafy.a303.backend.friend.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;

    @Transactional(readOnly = true)
    public PageResponseDto<ReadFriendResponseDto> getPendingFriends(long userId, FriendStatus friendStatus) {
        List<ReadFriendResponseDto> pendingFriends = friendRepository
                .findByFriendUserIdAndStatus(userId, friendStatus)
                .stream()
                .map(friend -> FriendMapper.INSTANCE.readPendingFriendResponseDto(friend.getUser()))
                .collect(Collectors.toList());

        if (FriendStatus.APPROVED.equals(friendStatus)) {
            List<ReadFriendResponseDto> addFriends = friendRepository
                    .findByUserUserId(userId)
                    .stream()
                    .map(friend -> FriendMapper.INSTANCE.readPendingFriendResponseDto(friend.getFriend()))
                    .toList();

            pendingFriends.addAll(addFriends);
        }

        return PageResponseDto
                .<ReadFriendResponseDto>builder()
                .content(pendingFriends)
                .build();
    }
}
