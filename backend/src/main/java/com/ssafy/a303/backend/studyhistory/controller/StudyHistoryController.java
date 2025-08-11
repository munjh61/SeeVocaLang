package com.ssafy.a303.backend.studyhistory.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.studyhistory.dto.GetStudyDaysCommandDto;
import com.ssafy.a303.backend.studyhistory.dto.GetStudyDaysResposneDto;
import com.ssafy.a303.backend.studyhistory.service.StudyHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StudyHistoryController {

    private static final String GET_STUDY_HISTORY_SUCCESS_MSG = "학습 통계를 성공적으로 불러왔습니다.";

    private final StudyHistoryService studyHistoryService;

    @GetMapping("/api/v1/users/studyhistory")
    public ResponseEntity<BaseResponseDto<GetStudyDaysResposneDto>> getStudyDays(
            @AuthenticationPrincipal CustomUserDetails user,
            @RequestParam int year,
            @RequestParam int month
    ) {
        Long userId = user.getUserId();
        GetStudyDaysCommandDto commandDto = new GetStudyDaysCommandDto(userId, year, month);
        List<String> days = studyHistoryService.getStudyDays(commandDto)
                .stream()
                .map(date -> date.toLocalDate().toString())
                .toList();

        return ResponseEntity.ok(new BaseResponseDto<>(GET_STUDY_HISTORY_SUCCESS_MSG, new GetStudyDaysResposneDto(days)));
    }
}
