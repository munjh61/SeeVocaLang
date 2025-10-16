package com.ssafy.a303.backend.photo.dto;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> origin/be/feat-fast-api
public record CreateWordPhotoCommandDto(
        String nameEn,
        String nameKo,
        String imageKey,
<<<<<<< HEAD
        List<Long> folders,
=======
        Long   folderId,
>>>>>>> origin/be/feat-fast-api
        Long   userId
) { }