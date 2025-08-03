package com.ssafy.a303.backend.sociallogin.service;

import com.ssafy.a303.backend.sociallogin.entity.Provider;
import com.ssafy.a303.backend.sociallogin.entity.SocialLoginEntity;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginErrorCode;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginException;
import com.ssafy.a303.backend.sociallogin.oauth.OAuth2UserInfo;
import com.ssafy.a303.backend.sociallogin.repository.SocialLoginRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class SocialLoginService {

    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;

    // 소셜 로그인 정보로 유저 조회
    public Optional<UserEntity> findUserBySocialLogin(Provider provider, String socialUid){
        return socialLoginRepository
                .findByProviderAndSocialUid(provider, socialUid)
                .map(SocialLoginEntity::getUser);
    }

    // 소셜 유저 등록
    public UserEntity registerNewSocialUser(OAuth2UserInfo userInfo, Provider provider, String socialUid) {
        // 1. 닉네임 중복 처리
        String baseNickname = userInfo.getNickname();
        String uniqueNickname = generateUniqueNickname(baseNickname);

        // 2. 신규 UserEntity 생성
        UserEntity user = new UserEntity(null, null, uniqueNickname, true);
        userRepository.save(user);

        // 3. 소셜 로그인 정보 등록
        registerSocialLogin(user, provider, socialUid);

        log.info("신규 유저 가입 완료: userId={}, nickname={}, provider={}", user.getUserId(), user.getNickname(), provider);
        return user;
    }

    private String generateUniqueNickname(String baseNickname) {
        String candidate = baseNickname;
        int attempt = 0;

        while (userRepository.existsByNickname(candidate)) {
            attempt++;
            candidate = baseNickname + "_" + (int)(Math.random() * 10000);
            if (attempt > 10) break;
        }

        return candidate;
    }

    public void registerSocialLogin(UserEntity user, Provider provider, String socialUid) {
        if (socialLoginRepository.existsByProviderAndSocialUid(provider, socialUid)) {
            log.warn("이미 등록된 소셜 로그인: provider={}, uid={}", provider, socialUid);
            throw new SocialLoginException(SocialLoginErrorCode.DUPLICATED_SOCIAL_LOGIN);
        }

        socialLoginRepository.save(new SocialLoginEntity(user, provider, socialUid));
        log.info("소셜 로그인 등록 완료: userId={}, provider={}, uid={}", user.getUserId(), provider, socialUid);
    }
}
