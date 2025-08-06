import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";

// 요청 보낼 API 주소
const LOGIN_URL = `${BASE_URL}/api/v1/auth/signin`;

// 로그인 함수
export const signin = async (loginId: string, password: string) => {
  try {
    const response = await axios.post(
      LOGIN_URL,
      { loginId, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const { data } = response.data;
    const nickname = data.nickname;
    const profileImage = data.profile_image ?? null;
    const token = response.headers["authorization"];

    console.log("✅ 로그인 성공");
    console.log("닉네임:", nickname);
    console.log("프로필 이미지:", profileImage);
    console.log("토큰:", token);

    return { nickname, profileImage, token };
  } catch (error) {
    console.error("❌ 로그인 실패", error);
  }
};
