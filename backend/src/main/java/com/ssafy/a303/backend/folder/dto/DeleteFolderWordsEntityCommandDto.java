package com.ssafy.a303.backend.folder.dto;

import com.ssafy.a303.backend.folderword.entity.FolderWordEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteFolderWordsEntityCommandDto {
    private List<FolderWordEntity> folderWordEntities;
}
