package com.ssafy.a303.backend.user.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.a303.backend.folder.entity.QFolderEntity;
import com.ssafy.a303.backend.studyhistory.entity.QStudyHistoryEntity;
import com.ssafy.a303.backend.user.dto.UserMonthlyStatsDto;
import com.ssafy.a303.backend.user.entity.QUserEntity;
import com.ssafy.a303.backend.word.entity.QWordEntity;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public class UserRepositoryImpl extends QuerydslRepositorySupport implements UserQueryRepository {

    public UserRepositoryImpl() {
        super(UserRepositoryImpl.class);
    }

    @Override
    public UserMonthlyStatsDto findUserMonthlyStats(
            Long userId,
            LocalDateTime start,
            LocalDateTime end
    ) {
        QUserEntity u = QUserEntity.userEntity;
        QStudyHistoryEntity sh = QStudyHistoryEntity.studyHistoryEntity;
        QWordEntity w = QWordEntity.wordEntity;
        QFolderEntity f = QFolderEntity.folderEntity;

        // 서브쿼리들 (각 테이블에서 카운트만 뽑음)
        JPQLQuery<Long> monthStudyCount = JPAExpressions
                .select(sh.studyHistoryId.count())
                .from(sh)
                .where(sh.user.userId.eq(userId)
                        .and(sh.createdAt.goe(start))
                        .and(sh.createdAt.lt(end)));

        JPQLQuery<Long> totalWordsCount = JPAExpressions
                .select(w.wordId.count())
                .from(w)
                .where(w.user.userId.eq(userId));

        JPQLQuery<Long> totalFoldersCount = JPAExpressions
                .select(f.folderId.count())
                .from(f)
                .where(f.user.userId.eq(userId));

        return from(u)
                .select(Projections.constructor(UserMonthlyStatsDto.class,
                        u.totalDays.coalesce(0).longValue(),      // totalDaysCount
                        u.streakDays.coalesce(0).longValue(),     // streakDaysCount
                        monthStudyCount,
                        totalWordsCount,
                        totalFoldersCount
                ))
                .where(u.userId.eq(userId))
                .fetchOne();
    }

}