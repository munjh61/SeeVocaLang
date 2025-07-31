package com.ssafy.a303.backend.user.controller;

import com.ssafy.a303.backend.common.dto.BaseResponseDto;
import com.ssafy.a303.backend.user.dto.SignInRequestDto;
import com.ssafy.a303.backend.user.dto.SignInResponseDto;
import com.ssafy.a303.backend.user.dto.SignUpRequestDto;
import com.ssafy.a303.backend.user.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<BaseResponseDto<Void>> signUp(@Valid @RequestBody SignUpRequestDto requestDto) {
        BaseResponseDto<Void> res = authService.signUp(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    // 아이디 중복 확인
    @GetMapping("/validate/login-id")
    public ResponseEntity<BaseResponseDto<Void>> validateLoginId(@RequestParam String loginId) {
        BaseResponseDto<Void> res = authService.validateLoginId(loginId);
        return ResponseEntity.ok(res);
    }

    // 닉네임 중복 확인
    @GetMapping("/validate/nickname")
    public ResponseEntity<BaseResponseDto<Void>> validateNickname(@RequestParam String nickname) {
        BaseResponseDto<Void> res = authService.validateNickname(nickname);
        return ResponseEntity.ok(res);
    }

    // 로그인
    @PostMapping("/signin")
    public ResponseEntity<BaseResponseDto<SignInResponseDto>> signIn(
            @Valid @RequestBody SignInRequestDto requestDto,
            HttpServletResponse response
    ) {
        // AuthService 가: RT 쿠키 부착, AT 헤더(X-Access-Token) 설정을 수행함
        SignInResponseDto data = authService.signIn(requestDto, response);

        BaseResponseDto<SignInResponseDto> body = BaseResponseDto.<SignInResponseDto>builder()
                .message("로그인에 성공했습니다.")
                .content(data)
                .build();

        return ResponseEntity.ok(body);
    }

    // 로그아웃
    @PostMapping("/signout")
    public ResponseEntity<BaseResponseDto<Void>> signOut(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestHeader(value = "X-Refresh-Token", required = false) String refreshTokenFromHeader,
            @RequestParam(value = "refreshToken", required = false) String refreshTokenFromParam
    ) {
        // 1) HttpOnly 쿠키 (권장), 2) X-Refresh-Token 헤더, 3) query/body 파라미터 순으로 시도
        String refreshToken = resolveRefreshToken(request, refreshTokenFromHeader, refreshTokenFromParam);

        if (!StringUtils.hasText(refreshToken)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    BaseResponseDto.<Void>builder()
                            .message("리프레시 토큰이 없습니다. 쿠키 또는 헤더/파라미터를 확인하세요.")
                            .build()
            );
        }

        authService.signOut(refreshToken, response);

        return ResponseEntity.ok(
                BaseResponseDto.<Void>builder()
                        .message("로그아웃 되었습니다.")
                        .build()
        );
    }

    private String resolveRefreshToken(HttpServletRequest request, String headerToken, String paramToken) {
        // 1) 쿠키에서 찾기 (CookieUtil 의 실제 쿠키명과 맞추세요)
        String cookieToken = findCookieValue(request, "refreshToken");
        if (StringUtils.hasText(cookieToken)) return cookieToken;

        // 2) 헤더
        if (StringUtils.hasText(headerToken)) return headerToken;

        // 3) 파라미터
        if (StringUtils.hasText(paramToken)) return paramToken;

        return null;
    }

    private String findCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie c : cookies) {
            if (name.equals(c.getName())) {
                return c.getValue();
            }
        }
        return null;
    }
}
