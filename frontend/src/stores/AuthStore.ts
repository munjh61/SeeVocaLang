import { create } from "zustand";

type AuthUser = {
  id: string;
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
