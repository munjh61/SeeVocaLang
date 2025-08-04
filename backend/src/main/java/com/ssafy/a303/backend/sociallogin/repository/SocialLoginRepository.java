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

    // 이미 가입했는지 확인
    boolean existsByProviderAndSocialUid(Provider provider, String socialUid);
}