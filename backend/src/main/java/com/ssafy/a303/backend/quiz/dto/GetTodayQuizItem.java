package com.ssafy.a303.backend.quiz.dto;

import com.ssafy.a303.backend.quiz.entity.QuizEntity;

public record GetTodayQuizItem(
    Long wordId,
    String imageUrl,
    String nameEn,
    String nameKo,
    String audioUrl
) {
    public static GetTodayQuizItem of(QuizEntity quiz) {
        var w = quiz.getWord();
        return new GetTodayQuizItem(
                w.getWordId(),
                w.getImageUrl(),
                w.getNameEn(),
                w.getNameKo(),
                w.getAudioUrl()
        );
    }
}