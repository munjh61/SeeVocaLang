package com.ssafy.a303.backend.quiz.dto;

public record GetTodayQuizItem(
    Long wordId,
    String imageUrl,
    String nameEn,
    String nameKo,
    String audioUrl
) {}