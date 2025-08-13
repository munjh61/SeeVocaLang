package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CreateWordFolderItemDto(
        @JsonProperty(value = "folder_id")
        Long folderId,

        String name
) {}