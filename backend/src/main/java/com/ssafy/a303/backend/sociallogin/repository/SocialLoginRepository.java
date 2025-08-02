package com.ssafy.a303.backend.sociallogin.repository;

import com.ssafy.a303.backend.sociallogin.entity.Provider;
import com.ssafy.a303.backend.sociallogin.entity.SocialLoginEntity;
import com.ssafy.a303.backend.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SocialLoginRepository extends JpaRepository<SocialLoginEntity, Long> {
    // provider + uid로 조회
    Optional<SocialLoginEntity> findByProviderAndSocialUid(Provider provider, String socialUid);

    // 특정 유저가 해당 provider로 연동한 이력 있는지 확인
    Optional<SocialLoginEntity> findByUserAndProvider(UserEntity user, Provider provider);

    // 유저의 모든 소셜 연동 정보 조회
    List<SocialLoginEntity> findAllByUser(UserEntity user);

    // 유저 + provider 연동 해제
    void deleteByUserAndProvider(UserEntity user, Provider provider);
}