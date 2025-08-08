// lib/authApi.ts
import axios from "axios";
import { useAuthStore } from "../stores/AuthStore.ts";
import { BASE_URL } from "../types/Regex.ts";
import { isTokenExpired } from "./tokenUtils.ts";

// ✅ 인터셉터 중복 방지
let isRefreshing = false;
let refreshSubscribers: ((newToken: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (newToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach(cb => cb(newToken));
  refreshSubscribers = [];
};

// 🔧 axios 인스턴스 생성
export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ 요청 인터셉터
authApi.interceptors.request.use(async config => {
  const { accessToken, refreshAccessToken, logout } = useAuthStore.getState();

  if (!accessToken) {
    console.warn("⚠️ accessToken 없음");
    return config;
  }

  // 🔄 만료된 토큰 처리
  if (isTokenExpired(accessToken)) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          onRefreshed(newToken);
        }
      } catch (err) {
        logout();
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise(resolve => {
      subscribeTokenRefresh(newToken => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }

  // ⏩ 유효한 토큰이면 바로 적용
  config.headers.Authorization = accessToken.startsWith("Bearer ")
    ? accessToken
    : `Bearer ${accessToken}`;

  return config;
});
