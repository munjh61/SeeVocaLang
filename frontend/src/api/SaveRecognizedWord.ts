import { authApi } from "../utils/axios.ts";

export type SaveRecognizedWordRequest = {
  name_en: string;
  name_ko: string;
  image_key: string; // Redis key
  folder_id: number;
};

export const SaveRecognizedWordApi = async (
  body: SaveRecognizedWordRequest
): Promise<string> => {
  try {
    const res = await authApi.post(`/api/v1/photos/words`, body);

    if (res.status === 200 || res.status === 201) {
      return res.data.message as string;
    } else {
      throw new Error(res.data?.message || "단어 저장 실패");
    }
  } catch (error: any) {
    // 서버 메시지 우선 노출
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      "단어 저장 중 오류가 발생했어요.";
    console.error("❌ 단어 저장 실패:", msg, error);
    throw new Error(msg);
  }
};
