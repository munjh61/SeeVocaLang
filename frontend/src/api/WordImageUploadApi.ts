import { AxiosError } from "axios";
import { authApi } from "../utils/axios.ts";

export const WordImageUploadApi = async (
  word_id: number,
  folders: number[],
  image_key: string
): Promise<string> => {
  try {
    const res = await authApi.put(`/api/v1/photos/words/${word_id}`, {
      image_key,
      folders,
    });

    if (res.status === 200 || res.status === 201) {
      return res.data?.message ?? "이미지 수정 완료";
    } else {
      throw new Error(res.data?.message || "이미지 수정 실패");
    }
  } catch (error: unknown) {
    // axios 에러
    if (error instanceof AxiosError) {
      console.error(
        "❌ 이미지 업로드 실패:",
        error.response?.data || error.message
      );
    } else if (error instanceof Error) {
      console.error("❌ 이미지 업로드 실패:", error.message);
    } else {
      console.error("❌ 알 수 없는 오류:", error);
    }
    throw error;
  }
};
