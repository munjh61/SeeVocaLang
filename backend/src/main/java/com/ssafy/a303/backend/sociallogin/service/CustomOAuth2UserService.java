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
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final SocialLoginRepository socialLoginRepository;
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
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
            user = socialLoginOpt.get().getUser();
            if (user.isDeleted()) {
                log.warn("탈퇴 유저 로그인 시도 차단: userId={}, provider={}, uid={}", user.getUserId(), provider, providerUid);
                throw new SocialLoginException(SocialLoginErrorCode.SOCIAL_LOGIN_FAILED);
            }
            log.info("기존 유저 로그인 성공: userId={}, nickname={}", user.getUserId(), user.getNickname());
        } else {
            log.info("신규 유저 소셜 로그인 감지: 자동 회원가입 진행");
            user = registerNewUser(userInfo, provider, providerUid);
        }

        return CustomUserDetails.from(user);
    }

    private UserEntity registerNewUser(OAuth2UserInfo userInfo, Provider provider, String socialUid) {
        String baseNickname = userInfo.getNickname();
        String uniqueNickname = generateUniqueNickname(baseNickname);

        UserEntity user = new UserEntity(null, null, uniqueNickname, true);
        userRepository.save(user);

        socialLoginRepository.save(new SocialLoginEntity(user, provider, socialUid));
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

        if (!candidate.equals(baseNickname)) {
            log.info("닉네임 중복 회피: {} → {}", baseNickname, candidate);
        }

        return candidate;
    }
}
