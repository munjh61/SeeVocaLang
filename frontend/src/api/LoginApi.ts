import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";
import { useAuthStore } from "../stores/AuthStore.ts";

const LOGIN_URL = `${BASE_URL}/api/v1/auth/signin`;

export const signin = async (loginId: string, password: string) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { loginId, password },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("로그인 요청 URL:", LOGIN_URL);
    console.log("🔍 전체 응답:", response);

    const responseBody = response.data;
    const nickname = responseBody?.content?.nickname;
    const profileImage = responseBody?.content?.profileImage ?? null;

    const token = response.headers["authorization"];
    console.log("토큰 : ", token);

    if (!nickname || !token) {
      throw new Error("응답에서 필수 정보가 없습니다.");
    }

    // ✅ 토큰을 Zustand에 즉시 저장
    useAuthStore.getState().login(token, {
      userId: -1, // userInfo 요청 후 덮어쓸 값
      loginId,
      nickname,
      email: null,
      profileImage,
    });

    return { nickname, profileImage, token };
  } catch (error) {
    console.error("로그인 실패", error);
    throw error;
  }
};
