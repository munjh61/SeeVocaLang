import axios from "axios";
import { useAuthStore } from "../stores/AuthStore.ts";
import { BASE_URL } from "../types/Regex.ts";
import { isTokenExpired } from "./tokenUtils.ts";

// 🔄 토큰 재발급 동시 요청 제어
let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (newToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
};

const refreshToken = async (): Promise<string> => {
  try {
    const response = await axios.post(`${BASE_URL}/v1/auth/refresh`, null, {
      withCredentials: true, // 🔐 refreshToken은 쿠키 기반
    });

    const newToken = response.data?.data?.accessToken;
    if (!newToken) throw new Error("⚠️ 새 토큰이 없습니다.");
    return newToken;
  } catch (err) {
    console.error("❌ 액세스 토큰 재발급 실패:", err);
    throw err;
  }
};

// 🔧 axios 인스턴스 생성
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키도 포함
});

// ✅ 요청 인터셉터
authApi.interceptors.request.use(async config => {
  const { accessToken, login, user, logout } = useAuthStore.getState();

  // 🔍 accessToken 존재 여부 확인
  if (!accessToken) {
    console.warn("⚠️ accessToken 없음 (비로그인 상태)");
    return config;
  }

  // 🔍 accessToken 만료 여부 확인
  if (isTokenExpired(accessToken)) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        if (user) login(newToken, user);
        onRefreshed(newToken);
      } catch (error) {
        logout();
        isRefreshing = false;
        throw error;
      }

      isRefreshing = false;
    }

    // 🔁 재발급 기다리고 Authorization 설정
    return new Promise(resolve => {
      subscribeTokenRefresh(newToken => {
        config.headers.Authorization = `Bearer ${newToken}`;
        console.log(
          "🔁 [재발급 후] Authorization 헤더:",
          config.headers.Authorization
        ); // ⬅️ 로그
        resolve(config);
      });
    });
  }

  // 🔐 정상 토큰이면 바로 설정
  config.headers.Authorization = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;

  // ✅ 로그 추가
  console.log(
    "🚀 [요청 인터셉터] Authorization 헤더:",
    config.headers.Authorization
  );

  return config;
});
