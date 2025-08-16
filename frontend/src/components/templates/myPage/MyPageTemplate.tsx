import { CalendarCard } from "../../molecules/calendarCard/CalendarCard";
import { useEffect, useState } from "react";
import { ProfileModal } from "../profileModal/ProfileModal";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";
import {
  deleteAccount,
  getCalendar,
  getStatics,
  type StatisticsResponse,
} from "../../../api/MyPageApi";
import BackgroundLayer from "../../organisms/onboarding/BackgroundLayer.tsx";
import WantedImg1 from "../../../asset/png/background/wanted_img1.png";
import WantedImg2 from "../../../asset/png/background/wanted_img2.png";
import { BgCard } from "../../molecules/BgCard.tsx";
import { StatsNote } from "../../molecules/StateNote.tsx";

export const MyPageTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    const fetchCalendar = async () => {
      const result = await getCalendar(year, month);
      setDays(result);
    };
    fetchCalendar();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatics();
        if (data) {
          setStatistics(data); // API 구조에 맞춰서 content만 저장
        }
      } catch (error) {
        console.error("통계 불러오기 실패:", error);
      }
    };

    fetchStatistics();
  }, []);
  return (
    <div className="p-6 min-h-screen">
      {/* 한 줄 2개: 모바일 1열 → md부터 2열 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BgCard
          src={WantedImg1}
          ratio={4 / 4}
          className="w-full"
          contentClassName="p-4"
        >
          {/* 여기 내부에 자유롭게 UI 배치 */}
        </BgCard>

        <BgCard
          src={WantedImg2}
          ratio={1} // 4/4 대신 1이 더 읽기 쉬움
          className="w-full"
          contentClassName="p-4" // 카드 안 여백
        >
          <div className="h-full w-full flex flex-col overflow-auto mt-20 px-15 pb-5">
            <CalendarCard days={days} />

            <ul className="mt-3 space-y-2 relative overflow-visible">
              <StatsNote
                label="총 학습 일수"
                value={`${statistics?.content?.totalDaysCount ?? 0}일`}
              />
              <StatsNote
                label="이번달 학습 일수"
                value={`${statistics?.content?.monthDaysCount ?? 0}일`}
              />
              <StatsNote
                label="최대 연속 학습 일수"
                value={`${statistics?.content?.streakDaysCount ?? 0}일`}
              />
            </ul>
          </div>
        </BgCard>
      </div>
    </div>
  );
};
