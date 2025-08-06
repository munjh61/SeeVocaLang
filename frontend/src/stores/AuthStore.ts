import { create } from "zustand";

// 🔹 공통 타입 정의
export type AuthUser = {
  id: string;
  nickname: string;
  email: string | null;
  profileImage: string | null;
};

type AuthState = {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (
    token: string,
    user: {
      id: string;
      nickname: string;
      email: string | null;
      profileImage: string | null;
    }
  ) => void;
  logout: () => void;
};

// 🔹 Zustand 스토어
export const useAuthStore = create<AuthState>(set => ({
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
}));
