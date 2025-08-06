package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.common.exception.ErrorCode;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginErrorCode;
import com.ssafy.a303.backend.sociallogin.exception.SocialLoginException;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Spring Security 가 인증 과정에서 호출.
 * username 파라미터로 loginId 를 받는다.
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * loginId 로 사용자 로드
     */
    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        if (loginId == null) {
            throw new SocialLoginException(SocialLoginErrorCode.SOCIAL_LOGIN_FAILED);
        }

        UserEntity user = userRepository.findByLoginIdAndIsDeletedFalse(loginId)
                .orElseThrow(() -> new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

        if (user.isDeleted()) {
            throw new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND);
        }

        return CustomUserDetails.from(user);
    }

}
