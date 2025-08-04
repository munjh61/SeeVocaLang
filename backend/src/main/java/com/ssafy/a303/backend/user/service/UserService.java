package com.ssafy.a303.backend.user.service;

import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Optional<UserEntity> getUser(Long userId) {
        return userRepository.findById(userId);
    }
}
