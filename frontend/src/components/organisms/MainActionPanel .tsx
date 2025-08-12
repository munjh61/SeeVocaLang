import { useEffect, useState } from "react";
import { InfoCardLarge, InfoCardSmall } from "../molecules/infoCard/InfoCard";
import StarIcon from "../../asset/star_empty.svg?react";
import ThunderIcon from "../../asset/thunder.svg?react";
import { Icon } from "../atoms/icon/Icon";
import { InfoCardProgressBar } from "./InfoCardProgressBar";
import { todayStudyStatus } from "../../api/TodayStudyStatusApi";
import { userStatistics } from "../../api/UserStatisticsApi.ts";
import { useNavigate } from "react-router-dom";

type StudyStatus = { lastSolvedNumber: number; totalProblemCount: number };
type UserStats = {
  totalDaysCount: number;
  streakDaysCount: number;
  monthDaysCount: number;
  totalWordsCount: number;
  totalFoldersCount: number;
};

export const MainActionPanel = () => {
  const [loading, setLoading] = useState(true);
  const [studyStatus, setStudyStatus] = useState<StudyStatus | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);

      const [studyRes, statsRes] = await Promise.allSettled([
        todayStudyStatus(),
        userStatistics(),
      ]);

      if (!alive) return;

      //  todayStudyStatus 처리
      if (studyRes.status === "fulfilled") {
        const study = studyRes.value;
        setStudyStatus({
          lastSolvedNumber: study.lastSolvedNumber,
          totalProblemCount: 20,
        });
      } else {
        console.error("❌ 오늘의 학습현황 실패:", studyRes.reason);
      }

      //  userStatistics 처리
      if (statsRes.status === "fulfilled") {
        setUserStats(statsRes.value);
      } else {
        console.error("❌ 사용자 통계 실패:", statsRes.reason);
      }

      //  둘 다 실패했을 때만 에러 메시지 표시
      if (studyRes.status === "rejected" && statsRes.status === "rejected") {
        setError("데이터를 불러오지 못했어요.");
      }

      setLoading(false);
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="flex flex-col flex-1/2 gap-2">
      <InfoCardLarge
        bgColor="gradientPurple"
        icon={<Icon icon={StarIcon} color="white" />}
        mainTitle="오늘의 단어"
        subTitle="새로운 어휘 학습"
        buttonText="단어 보기"
        emoji="📚"
        className="flex-1 basis-1/4"
      />

      <InfoCardLarge
        bgColor="gradientRed"
        icon={<Icon icon={ThunderIcon} color="white" />}
        mainTitle="오늘의 학습!"
        subTitle="맞춤형 학습 시작"
        buttonText="학습 시작하기"
        emoji="⚡️"
        className="flex-1 basis-1/4"
        onClick={() => {
          nav("/quiz/0", {
            state: {
              isTodayMission: true,
              startIndex: studyStatus?.lastSolvedNumber ?? 0,
            },
          });
        }}
      />

      {/* 진행바: 로딩이면 스켈레톤, 아니면 실제 값 */}
      {loading ? (
        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full w-1/3 animate-pulse bg-gray-300" />
        </div>
      ) : studyStatus ? (
        <InfoCardProgressBar
          current={studyStatus.lastSolvedNumber}
          total={studyStatus.totalProblemCount}
          height={8}
        />
      ) : null}

      <div className="flex flex-row justify-between flex-1 basis-1/4 gap-2">
        <InfoCardSmall
          bgColor="gradientPurple"
          mainTitle={
            loading ? "—" : (userStats?.totalWordsCount ?? 0).toString()
          }
          subTitle="학습한 단어"
          emoji="📖"
          className="flex-1 h-full"
        />
        <InfoCardSmall
          bgColor="gradientRed"
          mainTitle={loading ? "—" : `${userStats?.streakDaysCount ?? 0}일`}
          subTitle="연속 학습"
          emoji="🔥"
          className="flex-1 h-full"
        />
      </div>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </section>
  );
};
