package com.ssafy.a303.backend.common.utility;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum S3Directory {
    IMAGE("images"),
    TTS("audios");

    private final String path;
}
