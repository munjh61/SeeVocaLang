package com.ssafy.a303.backend.folder.repository.query;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.entity.QFolderEntity;
import com.ssafy.a303.backend.folderword.entity.QFolderWordEntity;
import com.ssafy.a303.backend.word.entity.QWordEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FolderQueryRepositoryImpl extends QuerydslRepositorySupport implements FolderQueryRepository {

    public FolderQueryRepositoryImpl() {
        super(FolderQueryRepositoryImpl.class);
    }

    // 폴더 안에 있는 가장 최근의 단어의 이미지를 썸네일로 한다.
    @Override
    public List<ReadFoldersResponseDto> findAllByUserId(long userId, long folderId, Pageable pageable) {
        QFolderEntity folderEntity = QFolderEntity.folderEntity;

        QWordEntity resultWord = new QWordEntity("resultWord");
        QWordEntity maxWord = new QWordEntity("maxWord");

        JPQLQuery<Long> thumbnail = JPAExpressions
                .select(maxWord.wordId.max())
                .from(QFolderWordEntity.folderWordEntity)
                .join(QFolderWordEntity.folderWordEntity.word, maxWord)
                .where(QFolderWordEntity.folderWordEntity.folder.folderId.eq(folderEntity.folderId)
                        .and(maxWord.isDeleted.eq(false)));

        JPQLQuery<String> projections = JPAExpressions
                .select(resultWord.imageUrl)
                .from(resultWord)
                .where(resultWord.wordId.eq(thumbnail));

        return from(folderEntity)
                .select(Projections.constructor(ReadFoldersResponseDto.class,
                        folderEntity.folderId,
                        folderEntity.name,
                        projections,
                        folderEntity.description,
                        folderEntity.isFavorite
                ))
                .where(
                        folderEntity.user.userId.eq(userId),
                        folderId != -1 ? folderEntity.folderId.lt(folderId) : null
                )
                .orderBy(folderEntity.folderId.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();
    }

}
