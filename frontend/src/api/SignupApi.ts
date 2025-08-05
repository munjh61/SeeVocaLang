// 임시 api
import axios from "axios";

const BASE_URL =
  "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com:8080";

export const checkIdDuplicate = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/auth/validation-id`, {
      params: { value: id },
    });
    console.log("응답 메시지 : ", response.data.message);

    return response.status === 200;
  } catch (error) {
    console.error("❌ 아이디 중복 확인 실패", error);
    return false;
  }
};

export const checkNicknameDuplicate = async (
  nickname: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/auth/validation-nickname`,
      {
        params: { value: nickname },
      }
    );
    console.log("닉네임 중복 여부 : ", response.data.message);
    return response.status === 200;
  } catch (error) {
    console.error("❌ 닉네임 중복 확인 실패", error);
    return false;
  }
};

export const registerUser = async (form: {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}): Promise<{ success: boolean }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("📦 회원가입 요청 데이터:", form);
      resolve({ success: true });
    }, 1000);
  });
};
