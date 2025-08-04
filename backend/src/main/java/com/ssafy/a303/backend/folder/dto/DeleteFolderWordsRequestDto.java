package com.ssafy.a303.backend.folder.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeleteFolderWordsRequestDto {
    @JsonProperty(value = "word_ids")
    private List<Long> wordIds;
}
