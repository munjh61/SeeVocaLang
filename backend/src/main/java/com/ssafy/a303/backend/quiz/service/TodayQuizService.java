package com.ssafy.a303.backend.quiz.service;

import com.ssafy.a303.backend.quiz.dto.GetTodayQuizItem;
import com.ssafy.a303.backend.quiz.dto.GetTodayQuizStatusResultDto;
import com.ssafy.a303.backend.quiz.dto.UpdateTodayQuizCommandDto;
import com.ssafy.a303.backend.quiz.entity.QuizEntity;
import com.ssafy.a303.backend.quiz.exception.QuizAlreadyCompleteRuntimeException;
import com.ssafy.a303.backend.quiz.exception.QuizNumberExceedRuntimeException;
import com.ssafy.a303.backend.quizorder.service.QuizOrderService;
import com.ssafy.a303.backend.studyhistory.service.StudyHistoryService;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserErrorCode;
import com.ssafy.a303.backend.user.exception.UserException;
import com.ssafy.a303.backend.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodayQuizService {

    private final QuizService quizService;
    private final QuizOrderService quizOrderService;
    private final StudyHistoryService studyHistoryService;
    private final UserService userService;

    public GetTodayQuizStatusResultDto getTodayQuizStatus(Long userId, LocalDateTime currentTime) {
        LocalDateTime endTime = currentTime.plusDays(1).minusNanos(1);
        int lastSolvedNumber = quizOrderService.getLastResolvedQuiz(userId, currentTime, endTime);
        int totalProblemCount = quizService.getTodayTotalQuizCount(currentTime, endTime);
        return new GetTodayQuizStatusResultDto(lastSolvedNumber, totalProblemCount);
    }

    public List<GetTodayQuizItem> getTodayQuizItemList(Long userId, LocalDateTime currentTime) {
        LocalDateTime endTime = currentTime.plusDays(1).minusNanos(1);
        int lastSolvedNumber = quizOrderService.getLastResolvedQuiz(userId, currentTime, endTime);
        int quizTotalCount = quizService.getTodayTotalQuizCount(currentTime, endTime);
        if (lastSolvedNumber == quizTotalCount)
            throw new QuizAlreadyCompleteRuntimeException();

        List<QuizEntity> quizList = quizService.getTodayQuizList(lastSolvedNumber + 1, currentTime, endTime);
        return quizList.stream()
                .map(GetTodayQuizItem::of)
                .collect(Collectors.toList());
    }

    @Transactional
    public void saveTodayQuizProgress(UpdateTodayQuizCommandDto commandDto) {
        LocalDateTime currentTime = commandDto.currentTime();
        LocalDateTime endTime = currentTime.plusDays(1).minusNanos(1);
        int quizTotalCount = quizService.getTodayTotalQuizCount(currentTime, endTime);
        if (commandDto.quizNumber() >= quizTotalCount)
            throw new QuizNumberExceedRuntimeException();

        UserEntity user = userService.getUser(commandDto.userId())
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
        QuizEntity quiz = quizService.getQuiz(commandDto.quizNumber(), currentTime, endTime);
        quizOrderService.saveTodayQuizProgress(user, quiz);
    }

    @Transactional
    public void completeTodayQuiz(Long userId, LocalDateTime currentTime) {
        UserEntity user = userService.getUser(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        LocalDateTime endTime = currentTime.plusDays(1).minusNanos(1);
        studyHistoryService.completeTodayQuiz(user, currentTime, endTime);
    }
}
