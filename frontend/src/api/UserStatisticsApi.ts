import { authApi } from "../utils/axios";

export type UserStatisticsApi = {
  totalDaysCount: number;
  streakDaysCount: number;
  monthDaysCount: number;
  totalWordsCount: number;
  totalFoldersCount: number;
};

export const userStatistics = async (): Promise<UserStatisticsApi> => {
  const res = await authApi.get("/api/v1/users/statistics");
  const c = res.data?.content;

  if (!c) throw new Error("content 없음");
  return {
    totalDaysCount: Number(c.totalDaysCount ?? 0),
    streakDaysCount: Number(c.streakDaysCount ?? 0),
    monthDaysCount: Number(c.monthDaysCount ?? 0),
    totalWordsCount: Number(c.totalWordsCount ?? 0),
    totalFoldersCount: Number(c.totalFoldersCount ?? 0),
  };
};
