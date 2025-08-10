import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard.tsx";
import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const quizURL = `${BASE_URL}/api/v1/quiz`;

// 오늘의 학습
export const getQuizStatus = async () => {
  try {
    const res = await authApi.get(
      "http://ec2-13-125-250-93.ap-northeast-2.compute.amazonaws.com:8080/api/v1/quiz"
    );
    const words: VocaCardProps[] = res.data.content.map((w: VocaCardProps) => ({
      imageUrl: w.imageUrl,
      nameEn: w.nameEn,
      nameKo: w.nameKo,
      folders: w.folders,
    }));
    return words;
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 요청 실패:", error.message);
  }
};

// 오늘의 학습 단어
export const getTodayQuiz = async () => {
  try {
    const res = await authApi.get(`${quizURL}/words`);
    console.log("오늘의 학습 단어", res.data);
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 요청 실패:", error.message);
  }
};
