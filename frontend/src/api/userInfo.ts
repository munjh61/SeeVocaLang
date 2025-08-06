import { authApi } from "../utils/axios.ts";

// 유저 정보 타입 (선택)
export type UserInfo = {
  id: string;
  nickname: string;
  email: string | null;
  profileImage?: string | null;
};

// 유저 정보 조회 API
export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await authApi.get("/api/v1/users/info");
  return response.data;
};
