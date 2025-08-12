import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard.tsx";
import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";
import type { UserStatisticsApi } from "./UserStatisticsApi.ts";

const quizURL = `${BASE_URL}/api/v1/quiz`;

// 오늘의 학습
export const getQuizStatus = async () => {
  try {
    const res = await authApi.get(quizURL);
    console.log("오늘의 학습", res.data.content);
    const c = res.data?.content;
    const status: UserStatisticsApi = {
      totalDaysCount: Number(c.totalDaysCount ?? 0),
      streakDaysCount: Number(c.streakDaysCount ?? 0),
      monthDaysCount: Number(c.monthDaysCount ?? 0),
      totalWordsCount: Number(c.totalWordsCount ?? 0),
      totalFoldersCount: Number(c.totalFoldersCount ?? 0),
    };
    return status;
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 요청 실패:", error.message);
  }
};

// 오늘의 학습 단어
export const getTodayQuiz = async () => {
  try {
    const res = await authApi.get(`${quizURL}/words`);
    // console.log("오늘의 학습 단어", res.data);
    const words: VocaCardProps[] = res.data.content.words.map(
      (w: VocaCardProps) => ({
        wordId: w.wordId,
        imageUrl: w.imageUrl,
        nameEn: w.nameEn,
        nameKo: w.nameKo,
      })
    );
    return words;
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 요청 실패:", error.message);
  }
};

export const updateQuizStatus = async (quizNumber: number) => {
  try {
    const res = await authApi.put(
      quizURL,
      { quizNumber },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("오늘의 학습 진행도 저장", res.data.content);
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 진행도 저장 실패:", error.message);
  }
};

export const completeTodayQuiz = async () => {
  try {
    const res = await authApi.post(`${BASE_URL}/api/v/completion-quiz`);
    console.log(res.data.content);
  } catch (error) {
    if (error instanceof Error)
      console.error("❌ 오늘의 학습 완료 처리 실패:", error.message);
  }
};
