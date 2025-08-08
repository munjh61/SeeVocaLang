package com.ssafy.a303.backend.word.dto;

import com.ssafy.a303.backend.folder.dto.ReadFoldersSimpleResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadWordResponseDto {
    private long wordId;
    private String imageUrl;
    private String audioUrl;
    private String nameKo;
    private String nameEn;
    private List<ReadFoldersSimpleResponseDto> folders;
}
