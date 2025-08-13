package com.ssafy.a303.backend.folder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadFoldersResponseDto {
    private long folderId;
    private String name;
    private String thumbnailUrl;
    private String description;
    private int wordCount;
    private boolean favorite;
}
