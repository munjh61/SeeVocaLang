package com.ssafy.a303.backend.folderword.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class WordAlreadyExistInFolderRuntimeException extends SVLRuntimeException {
    public WordAlreadyExistInFolderRuntimeException() {
        super(FolderWordErrorCode.WORD_ALREADY_EXIST_IN_FOLDER);
    }
}
