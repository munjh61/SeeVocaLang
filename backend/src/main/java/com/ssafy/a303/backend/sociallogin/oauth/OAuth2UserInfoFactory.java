package com.ssafy.a303.backend.sociallogin.oauth;

import com.ssafy.a303.backend.sociallogin.entity.Provider;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginErrorCode;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginException;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(Provider provider, Map<String, Object> attributes) {
        return switch (provider) {
            case GOOGLE -> new GoogleUserInfo(attributes);
            case KAKAO -> new KakaoUserInfo(attributes);
            case NAVER -> new NaverUserInfo(attributes);
            default -> throw new SocialLoginException(SocialLoginErrorCode.UNSUPPORTED_OAUTH_PROVIDER);
        };
    }
}
