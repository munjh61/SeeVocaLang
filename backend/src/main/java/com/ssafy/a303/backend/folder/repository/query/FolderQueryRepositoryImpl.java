package com.ssafy.a303.backend.folder.repository.query;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.ssafy.a303.backend.folder.dto.ReadFoldersResponseDto;
import com.ssafy.a303.backend.folder.entity.QFolderEntity;
import com.ssafy.a303.backend.folderword.entity.QFolderWordEntity;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.entity.QWordEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    public List<ReadWordResponseDto> deleteAllWordsByFolderId(long folderId, long wordId, Pageable pageable) {
        QFolderWordEntity folderWord = QFolderWordEntity.folderWordEntity;
        QWordEntity word = new QWordEntity("resultWord");

        return from(word)
                .select(word)
                .select(Projections.constructor(ReadWordResponseDto.class,
                        word.wordId,
                        word.imageUrl,
                        word.audioUrl,
                        word.nameKo,
                        word.nameEn
                ))
                .join(folderWord).on(folderWord.word.wordId.eq(word.wordId))
                .where(
                        folderWord.folder.folderId.eq(folderId),
                        wordId != -1 ? word.wordId.lt(wordId) : null
                )
                .orderBy(word.wordId.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();
    }

    @Override
    @Transactional
    public boolean deleteAllWordsByFolderId(long folderId, List<Long> wordIds) {
        QFolderWordEntity folderWord = QFolderWordEntity.folderWordEntity;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(folderWord.folder.folderId.eq(folderId))
                .and(folderWord.word.wordId.in(wordIds));

        delete(folderWord).where(builder).execute();

        return true;
    }
}
