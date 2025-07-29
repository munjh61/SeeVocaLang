package com.ssafy.a303.backend.word.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.word.dto.DeleteWordCommandDto;
import com.ssafy.a303.backend.word.dto.ReadWordCommandDto;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;

    @GetMapping("/api/v1/words")
    public ResponseEntity<PageResponseDto<ReadWordResponseDto>> readWords(@RequestParam(defaultValue = "-1") long lastId) {

        PageResponseDto<ReadWordResponseDto> pageResponseDto = wordService.getWords(ReadWordCommandDto
                .builder()
                .userId(1)
                .lastId(lastId)
                .size(10)
                .build());

        return ResponseEntity.ok(pageResponseDto);
    }

    @DeleteMapping("/api/v1/words/{wordId}")
    public ResponseEntity<BaseResponseDto<Void>> deleteWord(@PathVariable long wordId) {
        BaseResponseDto<Void> baseResponseDto = wordService.deleteWord(DeleteWordCommandDto
                .builder()
                .userId(1)
                .wordId(wordId)
                .build());

        return ResponseEntity.ok(baseResponseDto);
    }

}
