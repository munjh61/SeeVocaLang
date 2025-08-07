package com.ssafy.a303.backend.friend.repository.query;

import org.springframework.stereotype.Repository;

public interface FriendQueryRepository {
    boolean existsFriend(long senderId, long receiverId);
    long deleteFriend(long senderId, long receiverId);
}
