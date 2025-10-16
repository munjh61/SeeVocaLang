package com.ssafy.a303.backend.photo.dto;

<<<<<<< HEAD
import java.util.List;

public record UpdatePhotoWordCommandDto(
    Long userId,
    Long wordId,
    String imageKey,
    List<Long> folders
=======
public record UpdatePhotoWordCommandDto(
    Long userId,
    Long wordId,
    String imageKey
>>>>>>> origin/be/feat-fast-api
) {}