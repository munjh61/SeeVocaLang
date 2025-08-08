package com.ssafy.a303.backend.word.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.dto.PageResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.word.dto.CardGameResponseDto;
import com.ssafy.a303.backend.word.dto.DeleteWordCommandDto;
import com.ssafy.a303.backend.word.dto.ReadWordCommandDto;
import com.ssafy.a303.backend.word.dto.ReadWordResponseDto;
import com.ssafy.a303.backend.word.service.WordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;

    @GetMapping("/api/v1/words")
    public ResponseEntity<PageResponseDto<ReadWordResponseDto>> readWords(@AuthenticationPrincipal CustomUserDetails userDetails) {

        PageResponseDto<ReadWordResponseDto> pageResponseDto = wordService.getWords(ReadWordCommandDto.builder()
                .userId(userDetails.getUserId()).build());

        return ResponseEntity.ok(pageResponseDto);
    }

    @DeleteMapping("/api/v1/words/{wordId}")
    public ResponseEntity<BaseResponseDto<Void>> deleteWord(@PathVariable long wordId,
                                                            @AuthenticationPrincipal CustomUserDetails userDetails) {
        BaseResponseDto<Void> baseResponseDto = wordService.deleteWord(DeleteWordCommandDto
                .builder()
                .userId(userDetails.getUserId())
                .wordId(wordId)
                .build());

        return ResponseEntity.ok(baseResponseDto);
    }

    @GetMapping("/api/v1/card-game")
    public ResponseEntity<BaseResponseDto<CardGameResponseDto>> getCardGameWords(@AuthenticationPrincipal CustomUserDetails userDetails) {
        CardGameResponseDto result = wordService.getCardGameWords(userDetails.getUserId());
        return ResponseEntity.ok(BaseResponseDto.<CardGameResponseDto>builder()
                .content(result)
                .build());
    }
}
