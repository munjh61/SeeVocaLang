package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserEntity findById(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));
    }
}
