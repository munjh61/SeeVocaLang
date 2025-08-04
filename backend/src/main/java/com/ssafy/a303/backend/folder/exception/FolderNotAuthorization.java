package com.ssafy.a303.backend.folder.exception;

import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class FolderNotAuthorization extends SVLRuntimeException {

    public FolderNotAuthorization(ErrorCode errorCode) {
        super(errorCode);
    }
}
