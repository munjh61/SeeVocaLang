package com.ssafy.a303.backend.photo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

<<<<<<< HEAD
import java.util.List;

=======
>>>>>>> origin/be/feat-fast-api
public record CreateWordRequestDto(
        @JsonProperty("name_en")    String nameEn,
        @JsonProperty("name_ko")    String nameKo,
        @JsonProperty("image_key")  String imageKey,
<<<<<<< HEAD
        List<Long> folders
=======
        @JsonProperty("folder_id")  Long   folderId
>>>>>>> origin/be/feat-fast-api
) {}