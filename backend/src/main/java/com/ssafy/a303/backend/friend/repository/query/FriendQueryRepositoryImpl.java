package com.ssafy.a303.backend.friend.repository.query;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.ssafy.a303.backend.friend.dto.ReadUsersWithStatusResponseDto;
import com.ssafy.a303.backend.friend.entity.QFriendEntity;
import com.ssafy.a303.backend.user.entity.QUserEntity;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;


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

    @Override
    public List<ReadUsersWithStatusResponseDto> getUsersWithStatus(long userId) {
        QFriendEntity friendTable = QFriendEntity.friendEntity;
        QUserEntity userTable = QUserEntity.userEntity;

        CaseBuilder caseBuilder = new CaseBuilder();
        Expression<String> status = caseBuilder.when(friendTable.friend.isNull()).then("NONE")
                .otherwise(friendTable.status.stringValue());

        return from(friendTable)
                .select(Projections.constructor(ReadUsersWithStatusResponseDto.class,
                        userTable.userId,
                        userTable.profileImage,
                        userTable.nickname,
                        status
                ))
                .rightJoin(userTable).on(userTable.userId.eq(friendTable.user.userId).and(userTable.userId.eq(userId)))
                .fetch();
    }
}
