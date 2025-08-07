package com.ssafy.a303.backend.friend.repository.query;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.ssafy.a303.backend.friend.entity.QFriendEntity;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;


@Repository
public class FriendQueryRepositoryImpl extends QuerydslRepositorySupport implements FriendQueryRepository {
    public FriendQueryRepositoryImpl() {
        super(FriendQueryRepositoryImpl.class);
    }

    @Override
    public boolean existsFriend(long senderId, long receiverId) {
        QFriendEntity friendTable = QFriendEntity.friendEntity;

        BooleanExpression userIdEq = friendTable.user.userId.eq(senderId);
        BooleanExpression friendIdEq = friendTable.friend.userId.eq(receiverId);
        BooleanExpression userIdEq2 = friendTable.user.userId.eq(receiverId);
        BooleanExpression friendIdEq2 = friendTable.friend.userId.eq(senderId);

        BooleanExpression condition = userIdEq.and(friendIdEq).or(friendIdEq2.and(userIdEq2));

        return from(friendTable)
                .select(Expressions.ONE)
                .where(condition).fetchFirst() != null;
    }

    @Override
    public long deleteFriend(long senderId, long receiverId) {
        QFriendEntity friendTable = QFriendEntity.friendEntity;

        BooleanExpression userIdEq = friendTable.user.userId.eq(senderId);
        BooleanExpression friendIdEq = friendTable.friend.userId.eq(receiverId);
        BooleanExpression userIdEq2 = friendTable.user.userId.eq(receiverId);
        BooleanExpression friendIdEq2 = friendTable.friend.userId.eq(senderId);

        BooleanExpression condition = userIdEq.and(friendIdEq).or(friendIdEq2.and(userIdEq2));

        return delete(friendTable)
                .where(condition)
                .execute();
    }
}
