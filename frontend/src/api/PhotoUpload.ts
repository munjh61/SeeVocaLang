import { authApi } from "../utils/axios.ts";

export type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  word: {
    word_id: number;
    image_url: string;
  };
};

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await authApi.post("/api/v1/photos", formData);
  console.log(response.data.content);
  return response.data.content; // ✅ message 무시하고 data만 반환
};
