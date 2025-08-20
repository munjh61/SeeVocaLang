// stores/AuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";

// ✅ API에서 최신 유저 정보를 받아와 store를 갱신하기 위해 추가
import { getUserInfo, type UserInfo } from "../api/userInfo";

export type AuthUser = {
  userId: number;
  loginId: string;
  nickname: string;
  email: string | null;
  profileImage: string | null;
  birthday: string | null;
};

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: AuthUser | null;

  login: (
    token: string,
    user: {
      userId: number;
      loginId: string;
      nickname: string;
      email: string | null;
      profileImage: string | null;
      birthday: string | null;
    }
  ) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  refreshAccessToken: () => Promise<string | null>;

  // ✅ 추가 액션들
  setUser: (user: AuthUser | null) => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  refreshUser: () => Promise<AuthUser | null>;
};

// ✅ UserInfo → AuthUser 매핑 유틸
function mapToAuthUser(u: UserInfo): AuthUser {
  return {
    userId: u.userId,
    loginId: u.loginId,
    nickname: u.nickname ?? "",
    email: u.email ?? null,
    profileImage: u.profileImage ?? null,
    birthday: u.birthday ?? null,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      isLoggedIn: false,
      user: null,

      login: (token, user) =>
        set({
          accessToken: token,
          isLoggedIn: true,
          user,
        }),

      logout: () =>
        set({
          accessToken: null,
          isLoggedIn: false,
          user: null,
        }),

      setAccessToken: token => {
        set({ accessToken: token });
      },

      refreshAccessToken: async () => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/v1/auth/refresh`,
            null,
            { withCredentials: true }
          );

          const newToken = response.data?.content?.accessToken;
          if (!newToken) throw new Error("새 토큰 없음");

          console.log("🔄 새 Access Token 발급:", newToken);

          get().setAccessToken(newToken);
          return newToken;
        } catch (err) {
          console.error("❌ refreshAccessToken 실패:", err);
          get().logout();
          return null;
        }
      },

      // ✅ 추가: store.user 직접 세팅
      setUser: user => set({ user }),

      // ✅ 추가: 일부 필드만 업데이트
      updateUser: partial =>
        set(state => ({
          user: state.user ? { ...state.user, ...partial } : state.user,
        })),

      // ✅ 추가: 서버에서 최신 유저 정보 재조회 → store 갱신
      refreshUser: async () => {
        try {
          const latest = await getUserInfo();
          const mapped = mapToAuthUser(latest);
          set({ user: mapped, isLoggedIn: true }); // 로그인 유지 가정
          return mapped;
        } catch (e) {
          console.error("❌ refreshUser 실패:", e);
          return null;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: state => ({
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
