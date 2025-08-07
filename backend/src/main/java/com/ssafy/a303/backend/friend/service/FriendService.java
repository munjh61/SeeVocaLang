package com.ssafy.a303.backend.friend.service;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.friend.dto.ReadFriendResponseDto;
import com.ssafy.a303.backend.friend.entity.FriendEntity;
import com.ssafy.a303.backend.friend.entity.FriendStatus;
import com.ssafy.a303.backend.friend.exception.AlreadyReceivedRequest;
import com.ssafy.a303.backend.friend.exception.FriendCantDelete;
import com.ssafy.a303.backend.friend.exception.FriendErrorCode;
import com.ssafy.a303.backend.friend.exception.FriendRequestNotFoundException;
import com.ssafy.a303.backend.friend.mapper.FriendMapper;
import com.ssafy.a303.backend.friend.repository.FriendRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final UserService userService;

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

    @Transactional
    public BaseResponseDto<Void> requestFriend(long senderId, long receiverId) {
        boolean exist = friendRepository.existsFriend(senderId, receiverId);

        if (exist)
            throw new AlreadyReceivedRequest(FriendErrorCode.FRIEND_ALREADY_RECEIVED_REQUEST);

        UserEntity sender = userService.getUser(senderId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        UserEntity receiver = userService.getUser(receiverId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.USER_NOT_FOUND));

        friendRepository.save(FriendEntity.builder()
                .user(sender)
                .friend(receiver)
                .build());

        return BaseResponseDto.<Void>builder()
                .message("성공적으로 친구를 요청했습니다.")
                .build();
    }

    @Transactional
    public BaseResponseDto<Void> updateFriendRequest(long senderId, long receiverId) {
        FriendEntity friend = friendRepository.findByUserUserIdAndFriendUserIdAndStatus(senderId, receiverId, FriendStatus.PENDING)
                .orElseThrow(() -> new FriendRequestNotFoundException(FriendErrorCode.FRIEND_REQUEST_NOT_FOUND));

        friend.updateStatus(FriendStatus.APPROVED);

        return BaseResponseDto.<Void>builder()
                .message("성공적으로 친구 요청을 수락했습니다.")
                .build();
    }
}
