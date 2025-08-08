import { create } from "zustand";
import { persist } from "zustand/middleware";

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
};

//  Zustand 스토어 + persist 적용
export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
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
