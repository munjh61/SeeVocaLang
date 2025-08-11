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
        const target = decodeURIComponent(
          getCookie("final_redirect") || "%2Fmain"
        );

        // 5) 쿠키 삭제
        deleteCookie("final_redirect");

        // 6) 이동 처리
        if (target.startsWith("http://") || target.startsWith("https://")) {
          // 풀 URL이면 외부 이동 (SPA 라우터가 아니라 브라우저 네비게이션)
          window.location.href = target;
        } else {
          // 경로만 있으면 react-router-dom 내부 라우팅
          navigate(target, { replace: true });
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
