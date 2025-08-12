import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { BASE_URL } from "../types/Regex";
import { authApi } from "../utils/axios.ts";

axios.defaults.withCredentials = true; // ✅ 쿠키 자동 전송

// 쿠키 읽기 유틸
function getCookie(name: string) {
  return (
    document.cookie
      .split("; ")
      .find(row => row.startsWith(name + "="))
      ?.split("=")[1] ?? ""
  );
}

// 쿠키 삭제 유틸
function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const login = useAuthStore(s => s.login);
  const setAccessToken = useAuthStore(s => s.setAccessToken);

  useEffect(() => {
    (async () => {
      try {
        // 1) 리프레시로 새 액세스 토큰 발급
        const reissue = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh`,
          null,
          { withCredentials: true }
        );
        const accessToken = reissue.data?.content?.accessToken;
        if (!accessToken) throw new Error("NO_ACCESS_TOKEN");

        // 2) 유저 정보 조회 (선택)
        let user = null;
        try {
          const me = await authApi.get(`${BASE_URL}/api/v1/users/info`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          user = me.data?.content;
        } catch {
          console.warn("⚠️ 유저 정보 조회 실패 → 토큰만 저장");
        }

        // 3) Zustand에 로그인 상태 저장
        if (user) {
          login(accessToken, {
            userId: user.userId,
            loginId: user.loginId,
            nickname: user.nickname,
            email: user.email ?? null,
            profileImage: user.profileImage ?? null,
          });
        } else {
          setAccessToken(accessToken);
        }
        // 4) 최종 목적지 쿠키(final_redirect) 읽기
        const raw = getCookie("final_redirect") || "%2Fmain";
        const target = decodeURIComponent(raw).trim();

        // (보안) 스킴 가드: javascript:, data: 등 차단
        if (/^(javascript|data|vbscript):/i.test(target)) {
          throw new Error("INVALID_REDIRECT_SCHEME");
        }

        // 5) 쿠키 삭제 (둘 다 제거)
        deleteCookie("final_redirect");
        deleteCookie("redirect_uri");

        // 6) 이동 처리 (정규화 + 안전 이동)
        const isAbsoluteUrl = /^https?:\/\//i.test(target);
        const normalizedPath = target.startsWith("/") ? target : `/${target}`;

        if (isAbsoluteUrl) {
          window.location.replace(target); // ✅ 외부: 현재 경로 싹 교체
        } else {
          navigate(normalizedPath, { replace: true }); // ✅ 내부: SPA 라우팅
        }
      } catch (err) {
        console.error("❌ OAuth 콜백 처리 실패:", err);
        deleteCookie("final_redirect");
        navigate("/login?error=token", { replace: true });
      }
    })();
  }, [login, navigate, setAccessToken]);

  return (
    <div className="grid h-screen place-items-center text-gray-600">
      로그인 처리 중…
    </div>
  );
}
