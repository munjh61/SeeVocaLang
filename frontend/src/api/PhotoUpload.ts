import { authApi } from "../utils/axios.ts";

type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  is_already_exist: boolean;
};

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await authApi.post("/api/v1/photos", formData);
  return response.data.content; // ✅ message 무시하고 data만 반환
};
