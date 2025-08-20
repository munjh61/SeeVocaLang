/**
 * useMyPageData
 * - 마이페이지에 필요한 3가지 데이터(유저정보, 캘린더, 통계)를 한 곳에서 로드/갱신하는 훅
 * - 반환: userInfo, statistics, days, 로딩/에러 상태, 개별/전체 새로고침 함수, setUserInfo
 */

import { useEffect, useMemo, useState, useCallback } from "react";
import { getUserInfo, type UserInfo } from "../api/userInfo";
import {
  getCalendar,
  getStatics,
  type StatisticsResponse,
} from "../api/MyPageApi";

export function useMyPageData() {
  const today = useMemo(() => new Date(), []);
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [days, setDays] = useState<string[]>([]);

  const [loading, setLoading] = useState({
    user: false,
    stats: false,
    calendar: false,
  });
  const [error, setError] = useState<{
    user?: unknown;
    stats?: unknown;
    calendar?: unknown;
  }>({});

  /** 유저정보 로드 */
  const refreshUserInfo = useCallback(async () => {
    setLoading(prev => ({ ...prev, user: true }));
    try {
      const data = await getUserInfo();
      setUserInfo(data);
      setError(prev => ({ ...prev, user: undefined }));
    } catch (e) {
      setError(prev => ({ ...prev, user: e }));
    } finally {
      setLoading(prev => ({ ...prev, user: false }));
    }
  }, []);

  /** 통계 로드 */
  const refreshStatistics = useCallback(async () => {
    setLoading(prev => ({ ...prev, stats: true }));
    try {
      const data = await getStatics();
      if (data) setStatistics(data);
      setError(prev => ({ ...prev, stats: undefined }));
    } catch (e) {
      setError(prev => ({ ...prev, stats: e }));
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  }, []);

  /** 캘린더 로드 (기본: 오늘 년/월) */
  const refreshCalendar = useCallback(
    async (y: number = year, m: number = month) => {
      setLoading(prev => ({ ...prev, calendar: true }));
      try {
        const result = await getCalendar(y, m);
        setDays(result);
        setError(prev => ({ ...prev, calendar: undefined }));
      } catch (e) {
        setError(prev => ({ ...prev, calendar: e }));
      } finally {
        setLoading(prev => ({ ...prev, calendar: false }));
      }
    },
    [year, month]
  );

  /** 최초 로드 */
  useEffect(() => {
    refreshUserInfo();
    refreshStatistics();
    refreshCalendar();
  }, [refreshUserInfo, refreshStatistics, refreshCalendar]);

  /** 전체 새로고침 */
  const refreshAll = useCallback(async () => {
    await Promise.all([
      refreshUserInfo(),
      refreshStatistics(),
      refreshCalendar(),
    ]);
  }, [refreshUserInfo, refreshStatistics, refreshCalendar]);

  return {
    userInfo,
    setUserInfo, // 프로필 수정 후 상위에서 상태 갱신 가능
    statistics,
    days,
    loading,
    error,
    refreshAll,
    refreshUserInfo,
    refreshStatistics,
    refreshCalendar,
  };
}
