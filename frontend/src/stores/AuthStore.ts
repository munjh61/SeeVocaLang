// stores/AuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";

export type AuthUser = {
  userId: number;
  loginId: string;
  nickname: string;
  email: string | null;
  profileImage: string | null;
};

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: AuthUser | null;

  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  refreshAccessToken: () => Promise<string | null>;
};

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
            {
              withCredentials: true,
            }
          );

          const newToken = response.data?.content?.accessToken;
          if (!newToken) throw new Error("새 토큰 없음");

          get().setAccessToken(newToken);
          return newToken;
        } catch (err) {
          console.error("❌ refreshAccessToken 실패:", err);
          get().logout();
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
