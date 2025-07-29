package com.ssafy.a303.backend.user.repository;

import com.ssafy.a303.backend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // 로그인 시 ID로 유저 조회
    Optional<UserEntity> findByLoginId(String loginId);

    // 아이디 중복 체크
    boolean existsByLoginId(String loginId);

    // 닉네임 중복 체크
    boolean existsByNickname(String nickname);
}
