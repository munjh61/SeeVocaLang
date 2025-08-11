package com.ssafy.a303.backend.word.repository.query;

import com.querydsl.core.Tuple;
import com.ssafy.a303.backend.folder.dto.ReadFoldersSimpleResponseDto;
import com.ssafy.a303.backend.folder.entity.QFolderEntity;
import com.ssafy.a303.backend.folderword.entity.QFolderWordEntity;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.entity.QWordEntity;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Repository
public class WordQueryRepositoryImpl extends QuerydslRepositorySupport implements WordQueryRepository {
    public WordQueryRepositoryImpl() {
        super(WordQueryRepositoryImpl.class);
    }

    @Override
    public List<ReadWordResponseDto> getWords(long userId) {
        QWordEntity word = QWordEntity.wordEntity;
        QFolderWordEntity folderWord = QFolderWordEntity.folderWordEntity;
        QFolderEntity folder = QFolderEntity.folderEntity;

        List<Tuple> tuples =
                from(folderWord)
                        .select(
                                word.wordId,
                                word.imageUrl,
                                word.audioUrl,
                                word.nameKo,
                                word.nameEn,
                                folder.folderId,
                                folder.name
                        )
                        .join(folderWord.word, word)
                        .join(folderWord.folder, folder)
                        .where(word.user.userId.eq(userId).and(word.isDeleted.eq(false)))
                        .fetch();

        Map<Long, ReadWordResponseDto> resultMap = new LinkedHashMap<>();

        for (Tuple tuple : tuples) {
            Long wordId = tuple.get(word.wordId);

            ReadWordResponseDto dto = resultMap.computeIfAbsent(wordId, id ->
                    ReadWordResponseDto.builder()
                            .wordId(id)
                            .imageUrl(tuple.get(word.imageUrl))
                            .audioUrl(tuple.get(word.audioUrl))
                            .nameKo(tuple.get(word.nameKo))
                            .nameEn(tuple.get(word.nameEn))
                            .folders(new ArrayList<>())
                            .build()
            );

            dto.getFolders().add(new ReadFoldersSimpleResponseDto(
                    tuple.get(folder.folderId),
                    tuple.get(folder.name)
            ));
        }

        return new ArrayList<>(resultMap.values());
    }
}
