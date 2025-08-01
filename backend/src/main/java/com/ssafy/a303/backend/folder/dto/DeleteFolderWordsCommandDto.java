package com.ssafy.a303.backend.folder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeleteFolderWordsCommandDto {
    private List<Long> wordIds;
    private long folderId;
}
