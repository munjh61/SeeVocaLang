import axios from "axios";
import { BASE_URL } from "../types/Regex.ts";

const baseurl = BASE_URL;

export const checkIdDuplicate = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${baseurl}/api/v1/auth/validation-id`, {
      params: { value: id },
    });
    return response.status === 200;
  } catch {
    return false;
  }
};

export const checkNicknameDuplicate = async (
  nickname: string
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `${baseurl}/api/v1/auth/validation-nickname`,
      {
        params: { value: nickname },
      }
    );
    return response.status === 200;
  } catch {
    return false;
  }
};

export const registerUser = async (form: {
  loginId: string;
  password: string;
  nickname: string;
  birthday: string;
}): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(`${baseurl}/api/v1/auth/signup`, form);

    return { success: response.status === 200 || response.status === 201 };
  } catch {
    return { success: false };
  }
};
