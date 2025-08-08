package com.ssafy.a303.backend.studyhistory.controller;

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

    private final StudyHistoryService studyHistoryService;

    @GetMapping("/api/v1/users/studyhistory")
    public ResponseEntity<GetStudyDaysResposneDto> getStudyDays(
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

        return ResponseEntity.ok(new GetStudyDaysResposneDto(days));
    }
}
