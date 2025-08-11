package com.ssafy.a303.backend.folderword.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum FolderWordErrorCode implements ErrorCode {
    WORD_ALREADY_EXIST_IN_FOLDER(400, "저장할 단어가 이미 폴더에 존재합니다.");

    private int statusCode;
    private String message;

    @Override
    public int getStatusCode() { return this.statusCode; }

    @Override
    public String getMessage() { return this.message; }
}
