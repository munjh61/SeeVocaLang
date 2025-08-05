package com.ssafy.a303.backend.user.repository;

import com.ssafy.a303.backend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // 로그인 시 ID로 유저 조회
    Optional<UserEntity> findByLoginId(String loginId);

    // 삭제되지 않은 유저만 조회
    Optional<UserEntity> findByUserIdAndIsDeletedFalse(Long userId);

    // 삭제되지 않은 전체 유저 조회
    List<UserEntity> findAllByIsDeletedFalse();

    // 이메일로 유저 조회 (탈퇴 유저 제외)
    Optional<UserEntity> findByEmailAndIsDeletedFalse(String email);

    // 아이디 중복 체크
    boolean existsByLoginId(String loginId);

    // 닉네임 중복 체크
    boolean existsByNickname(String nickname);

    // 이미 등록된 이메일인지 체크
    boolean existsByEmailAndIsDeletedFalse(String email);
}
