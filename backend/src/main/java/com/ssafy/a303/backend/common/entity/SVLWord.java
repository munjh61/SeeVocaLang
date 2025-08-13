package com.ssafy.a303.backend.common.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
public enum SVLWord {
    CLOCK("clock", "시계"),
    AIR_CONDITIONER("air conditioner", "에어컨"),
    LAPTOP("laptop", "노트북"),
    MOUSE("mouse", "마우스"),
    KEYBOARD("keyboard", "키보드"),
    PHONE("phone", "전화기"),
    DOOR("door", "문"),
    TABLE("table", "탁자"),
    SHOES("shoes", "신발"),
    CHAIR("chair", "의자"),
    GLASSES("glasses", "안경"),
    NAMEPLATE("nameplate", "명찰"),
    HAND("hand", "손");

    private final String nameEn;
    private final String nameKo;

    private static final Map<String, SVLWord> TERM_MAP =
            Arrays.stream(values())
                    .collect(Collectors.toMap(SVLWord::getNameEn, term -> term));

    public static Optional<SVLWord> fromEnglish(String english) {
        return Optional.ofNullable(TERM_MAP.get(english));
    }

    public static String translateToKorean(String english, String defaultKorean) {
        return fromEnglish(english)
                .map(SVLWord::getNameKo)
                .orElse(defaultKorean);
    }
}
