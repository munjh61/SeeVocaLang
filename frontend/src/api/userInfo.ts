import { authApi } from "../utils/axios.ts";
import { BASE_URL } from "../types/Regex.ts";

// 유저 정보 타입 (선택)
export type UserInfo = {
  userId: number;
  loginId: string;
  nickname: string;
  email: string | null;
  profileImage?: string | null;
  birthday: string | null;
};

// 유저 정보 조회 API
export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await authApi.get(`${BASE_URL}/api/v1/users/info`);
  return response.data.content; // ✅ content만 반환
};
