import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const quizURL = `${BASE_URL}/api/v1/quiz`;

// 오늘의 학습
export const getQuizStatus = async () => {
  try {
    const res = await authApi.get(quizURL);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getTodayQuiz = async () => {
  try {
    const res = await authApi.get(`${quizURL}/words`);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
