package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GetFoldersContainingWordsItemDto(
    @JsonProperty(value = "folder_id")
    Long folderId,

    String name,

    @JsonProperty(value = "is_word_exist")
    boolean isWordExist
) {}