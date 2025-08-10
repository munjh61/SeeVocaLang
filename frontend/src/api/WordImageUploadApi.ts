import { authApi } from "../utils/axios.ts";

export const WordImageUploadApi = async (
  word_id: number,
  image_key: string
): Promise<string> => {
  try {
    const res = await authApi.put(`/api/v1/photos/words/${word_id}`, {
      image_key,
    });

    if (res.status === 200 || res.status === 201) {
      return res.data?.message ?? "이미지 수정 완료";
    } else {
      throw new Error(res.data?.message || "이미지 수정 실패");
    }
  } catch (error: any) {
    console.error("❌ 이미지 업로드 실패:", error?.response?.data || error);
    throw error;
  }
};
