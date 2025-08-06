import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";

const LOGIN_URL = `${BASE_URL}/api/v1/auth/signin`;

export const signin = async (loginId: string, password: string) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { loginId, password },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("🔍 전체 응답:", response);
    console.log("전체 헤더:", response.headers);

    const responseBody = response.data;
    const nickname = responseBody?.content?.nickname;
    const profileImage = responseBody?.content?.profileImage ?? null;

    const token = response.headers["authorization"];

    if (!nickname || !token) {
      throw new Error("응답에서 필수 정보가 없습니다.");
    }

    return { nickname, profileImage, token };
  } catch (error) {
    console.error("❌ 로그인 실패", error);
    throw error;
  }
};
