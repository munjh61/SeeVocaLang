import { authApi } from "../utils/axios.ts";

type todayStudyStatusResult = {
  lastSolvedNumber: number;
  totalProblemCount: number;
};

export const todayStudyStatus = async (): Promise<todayStudyStatusResult> => {
  const response = await authApi.get("/api/v1/quiz");
  return response.data.content;
};
