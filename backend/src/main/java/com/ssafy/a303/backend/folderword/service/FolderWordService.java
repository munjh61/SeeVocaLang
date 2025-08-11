package com.ssafy.a303.backend.folderword.service;

import com.ssafy.a303.backend.folder.entity.FolderEntity;
import com.ssafy.a303.backend.folderword.entity.FolderWordEntity;
import com.ssafy.a303.backend.folderword.exception.WordAlreadyExistInFolderRuntimeException;
import com.ssafy.a303.backend.folderword.repository.FolderWordRepository;
import com.ssafy.a303.backend.word.entity.WordEntity;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FolderWordService {

    private final FolderWordRepository folderWordRepository;

    @Transactional
    public void saveWordInFolder(WordEntity wordEntity, FolderEntity folderEntity) {
        boolean isWordAlreadyExistInFolder = folderWordRepository.existsByWordWordIdAndFolderFolderId(wordEntity.getWordId(), folderEntity.getFolderId());
        if (isWordAlreadyExistInFolder)
            throw new WordAlreadyExistInFolderRuntimeException();

        FolderWordEntity folderWordEntity = FolderWordEntity.builder()
                .word(wordEntity)
                .folder(folderEntity)
                .build();

        folderWordRepository.save(folderWordEntity);
    }
}
