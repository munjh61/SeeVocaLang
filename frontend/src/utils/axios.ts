import axios from "axios";
import { useAuthStore } from "../stores/AuthStore.ts";
import { BASE_URL } from "../types/Regex.ts";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    // Bearer 중복 방지
    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;
    config.headers.Authorization = formattedToken;

    console.log("🔐 요청 헤더에 토큰 포함됨:", formattedToken);
  } else {
    console.warn(
      "⚠️ accessToken이 없습니다. 인증이 필요한 요청일 경우 실패할 수 있습니다."
    );
  }

  return config;
});
