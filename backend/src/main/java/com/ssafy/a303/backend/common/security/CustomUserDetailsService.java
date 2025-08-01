package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.user.entity.UserEntity;
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
        UserEntity user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + loginId));

        return CustomUserDetails.from(user);
    }
}
