package com.ssafy.a303.backend.friend.repository;

import com.ssafy.a303.backend.friend.entity.FriendEntity;
import com.ssafy.a303.backend.friend.entity.FriendStatus;
import com.ssafy.a303.backend.friend.repository.query.FriendQueryRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<FriendEntity, Long>, FriendQueryRepository {
    List<FriendEntity> findByUserUserId(long userId);
    List<FriendEntity> findByFriendUserIdAndStatus(long userId, FriendStatus status);

    long user(UserEntity user);
}