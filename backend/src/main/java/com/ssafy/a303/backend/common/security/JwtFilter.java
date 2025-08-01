package com.ssafy.a303.backend.common.security;

import com.ssafy.a303.backend.common.exception.CommonErrorCode;
import com.ssafy.a303.backend.user.entity.UserEntity;
import com.ssafy.a303.backend.user.exception.UserNotFoundException;
import com.ssafy.a303.backend.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;          // JWT 발급검증 유틸
    private final UserRepository userRepo;  // 유저 정보 조회용

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain fc)
            throws IOException, ServletException {

        String auth = req.getHeader("Authorization");

        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);

            if (jwt.validate(token)) {
                String userId = jwt.getUserId(token);
                UserEntity user = userRepo.findById(Long.valueOf(userId))
                        .orElseThrow(() -> new UserNotFoundException(CommonErrorCode.RESOURCE_NOT_FOUND));

                UserDetails details = CustomUserDetails.from(user);
                Authentication authentication = new UsernamePasswordAuthenticationToken(
                        details, null, details.getAuthorities()
                );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        fc.doFilter(req, res);
    }
}
