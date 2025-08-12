// 사진 분석 결과 Api
import { authApi } from "../utils/axios.ts";
import type { AnalysisResult } from "../types/FileUploadType.ts";

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await authApi.post("/api/v1/photos", formData);
  console.log(response.data.content);
  return response.data.content; // ✅ message 무시하고 data만 반환
};
