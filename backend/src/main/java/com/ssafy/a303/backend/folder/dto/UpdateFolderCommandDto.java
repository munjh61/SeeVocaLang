package com.ssafy.a303.backend.folder.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateFolderCommandDto {
    private long folderId;
    private long userId;
    private String description;
    private String name;
}
