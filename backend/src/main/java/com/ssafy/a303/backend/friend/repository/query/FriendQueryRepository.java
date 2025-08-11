package com.ssafy.a303.backend.friend.repository.query;

import com.ssafy.a303.backend.friend.dto.ReadUsersWithStatusResponseDto;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface FriendQueryRepository {
    boolean existsFriend(long senderId, long receiverId);
    long deleteFriend(long senderId, long receiverId);
    List<ReadUsersWithStatusResponseDto> getUsersWithStatus(long userId);
}
