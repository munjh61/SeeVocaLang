package com.ssafy.a303.backend.sociallogin.service;

import com.ssafy.a303.backend.common.security.CustomUserDetails;
import com.ssafy.a303.backend.sociallogin.entity.Provider;
import com.ssafy.a303.backend.sociallogin.entity.SocialLoginEntity;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginErrorCode;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginException;
import com.ssafy.a303.backend.sociallogin.oauth.OAuth2UserInfo;
import com.ssafy.a303.backend.sociallogin.oauth.OAuth2UserInfoFactory;
import com.ssafy.a303.backend.sociallogin.repository.SocialLoginRepository;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Hibernate;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;
    private final SocialLoginService socialLoginService;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        log.info("소셜 로그인 시도: {}", registrationId);

        Provider provider;
        try {
            provider = Provider.valueOf(registrationId.toUpperCase());
        } catch (IllegalArgumentException e) {
            log.warn("지원하지 않는 소셜 로그인 시도: {}", registrationId);
            throw new SocialLoginException(SocialLoginErrorCode.UNSUPPORTED_OAUTH_PROVIDER);
        }

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(provider, oAuth2User.getAttributes());
        String providerUid = userInfo.getProviderUid();
        log.info("소셜 UID 확인됨: provider={}, uid={}", provider, providerUid);

        // 기존 유저 확인
        Optional<SocialLoginEntity> socialLoginOpt = socialLoginRepository.findByProviderAndSocialUid(provider, providerUid);

        UserEntity user;
        if (socialLoginOpt.isPresent()) {
            SocialLoginEntity socialLogin = socialLoginOpt.get();
            user = socialLogin.getUser();
            Hibernate.initialize(user);
            if (user.isDeleted()) {
                log.warn("탈퇴 유저 로그인 시도 차단: userId={}, provider={}, uid={}", user.getUserId(), provider, providerUid);
                throw new SocialLoginException(SocialLoginErrorCode.SOCIAL_LOGIN_FAILED);
            }
            log.info("기존 유저 로그인 성공: userId={}, nickname={}", user.getUserId(), user.getNickname());
        } else {
            log.info("신규 유저 소셜 로그인 감지: 자동 회원가입 진행");
            user = socialLoginService.registerNewSocialUser(userInfo, provider, providerUid);
        }

        return CustomUserDetails.from(user);
    }
}
