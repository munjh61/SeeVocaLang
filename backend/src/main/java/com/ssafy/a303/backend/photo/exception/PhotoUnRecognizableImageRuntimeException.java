package com.ssafy.a303.backend.photo.exception;

import com.ssafy.a303.backend.common.exception.SVLRuntimeException;

public class PhotoUnRecognizableImageRuntimeException extends SVLRuntimeException {
    public PhotoUnRecognizableImageRuntimeException() {
        super(PhotoErrorCode.CANNOT_RECOGNIZE_OBJECT_FROM_IMAGE);
    }
}