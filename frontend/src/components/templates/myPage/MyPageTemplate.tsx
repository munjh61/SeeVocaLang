import { CalendarCard } from "../../molecules/calendarCard/CalendarCard";
import { useEffect, useState } from "react";
import { ProfileModal } from "../profileModal/ProfileModal";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";
import {
  getCalendar,
  getStatics,
  type StatisticsResponse,
} from "../../../api/MyPageApi";
import WantedImg1 from "../../../asset/png/background/wanted_img1.png";
import WantedImg2 from "../../../asset/png/background/wanted_img2.png";
import { BgCard } from "../../molecules/BgCard.tsx";
import { StatsNote } from "../../molecules/StateNote.tsx";
import DefaultProfileImg from "../../../asset/png/default_profile.png";

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
          setStatistics(data);
        }
      } catch (error) {
        console.error("통계 불러오기 실패:", error);
      }
    };

    fetchStatistics();
  }, []);
  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BgCard
          src={WantedImg1}
          ratio={1}
          className="w-full"
          contentClassName="p-4 overflow-visible" // ✅ 테이프 잘림 방지
        >
          {/* 여기 내부에 자유롭게 UI 배치 */}
          <div className="h-full w-full flex flex-col overflow-auto px-15 pb-5 ">
            {" "}
            {/* ✅ 위 패딩으로 음수오프셋 흡수 */}
            <div className="relative mb-4 flex justify-start pt-5">
              <button
                type="button"
                onClick={openModal}
                className="relative select-none px-5 py-3 md:px-6 md:py-3.5
               rounded-md bg-amber-200/90 border border-amber-400/70
               text-amber-900 text-sm md:text-base font-extrabold tracking-wide
               shadow [box-shadow:0_3px_0_#b45309,0_10px_16px_rgba(0,0,0,.12)]
               -rotate-1 transition
               hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="inline-flex items-center gap-2">
                  {/* 연필 아이콘 */}
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l8.06-8.06.92.92-8.06 8.06zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                  프로필 수정
                </span>

                {/* 테이프 조각 (좌상단 / 우하단) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 -left-4 h-3 w-16
                 rounded-[2px] bg-yellow-200/80 border border-yellow-300/60
                 shadow rotate-[-45deg]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-2 -right-4 h-3 w-16
                 rounded-[2px] bg-yellow-200/80 border border-yellow-300/60
                 shadow rotate-[-40deg]"
                />
              </button>
            </div>
            {/* 프로필 이미지: 종이 프레임 + (프레임 내부) 테이프 */}
            <div className="relative mx-auto my-2 w-fit">
              {/* 종이 프레임 */}
              <div className="relative -rotate-1 rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3 shadow">
                <img
                  src={userInfo?.profileImage || DefaultProfileImg}
                  alt="프로필 이미지"
                  className="block w-50 h-50 rounded-full object-cover ring-1 ring-amber-200 shadow-sm"
                  draggable={false}
                />

                {/* 종이 모서리 접힘 효과 (선택) */}
                <span
                  aria-hidden
                  className="absolute -top-1 -right-1 h-4 w-4 bg-white/60 rotate-45 shadow-sm"
                  style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
                />

                {/* 프레임 내부 코너 테이프 */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[60]" // ✅ 테이프 우선순위 상승
                >
                  {/* 상좌 */}
                  <span
                    className="absolute z-[60] -top-5 -left-7 h-4 w-24 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[-45deg]"
                  />
                  {/* 상우 */}
                  <span
                    className="absolute z-[60] -top-5 -right-7 h-4 w-24 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[40deg]"
                  />
                  {/* 하좌 */}
                  <span
                    className="absolute z-[60] -bottom-5 -left-6 h-4 w-20 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[40deg]"
                  />
                  {/* 하우 */}
                  <span
                    className="absolute z-[60] -bottom-5 -right-6 h-4 w-20 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[-45deg]"
                  />
                </div>
              </div>
            </div>
            <ul className="mt-10 space-y-2 relative overflow-visible">
              <StatsNote
                items={[
                  {
                    label: "닉네임",
                    value: userInfo?.nickname || "Pino",
                  },
                  {
                    label: "생년월일",
                    value: userInfo?.birthday || "1996-09-19",
                  },
                  {
                    label: "이메일",
                    value: userInfo?.email || "미연동",
                  },
                ]}
              />
              <StatsNote
                items={[
                  {
                    label: "총 단어 갯수",
                    value: statistics?.content.totalWordsCount || 0,
                  },
                ]}
              />
              <StatsNote
                items={[
                  {
                    label: "총 폴더 갯수",
                    value: statistics?.content.totalFoldersCount || 0,
                  },
                ]}
              />
            </ul>
          </div>
        </BgCard>

        <BgCard
          src={WantedImg2}
          ratio={1}
          className="w-full"
          contentClassName="p-4 overflow-visible" // ✅ 테이프 잘림 방지
        >
          <div className="relative h-full w-full flex flex-col overflow-auto px-15 pb-5 pt-15">
            {" "}
            {/* ✅ 위 패딩으로 음수오프셋 흡수 */}
            {/* 캘린더: 종이 프레임 + (프레임 내부) 테이프 */}
            <div className="relative mx-auto my-2 w-full md:max-w-[520px] overflow-visible z-[60]">
              {" "}
              {/* ✅ 오버플로우 해제 + z-index */}
              {/* 종이 프레임 */}
              <div className="relative -rotate-1 rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3 md:p-4 shadow z-[60]">
                {" "}
                {/* ✅ 회전 컨테이너도 z 부여 */}
                {/* 내용 클립 + 살짝 링/그림자 */}
                <div className="rounded-xl overflow-hidden ring-1 ring-amber-200 shadow-sm bg-white/30">
                  <CalendarCard days={days} />
                </div>
                {/* 프레임 내부 테이프 (코너를 과감히 넘김) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[60]" // ✅ 테이프 최상단
                >
                  {/* 상좌 */}
                  <span
                    className="absolute z-[60] -top-6 -left-8 h-4 w-28 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[-35deg]"
                  />
                  {/* 상우 */}
                  <span
                    className="absolute z-[60] -top-6 -right-8 h-4 w-28 rounded-[2px]
                   bg-yellow-200/90 border border-yellow-300/70 shadow
                   rotate-[32deg]"
                  />
                  {/* 필요 시 하좌/하우도 추가 가능 */}
                </div>
              </div>
            </div>
            <ul className="mt-3 space-y-2 relative overflow-visible">
              <StatsNote
                items={[
                  {
                    label: "총 학습 일 수",
                    value: statistics?.content.totalDaysCount || 0,
                  },
                ]}
              />
              <StatsNote
                items={[
                  {
                    label: "현재 연속 학습 일 수",
                    value: statistics?.content.monthDaysCount || 0,
                  },
                ]}
              />
              <StatsNote
                items={[
                  {
                    label: "최대 연속 학습 일 수",
                    value: statistics?.content.streakDaysCount || 0,
                  },
                ]}
              />
            </ul>
          </div>
        </BgCard>
      </div>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userInfo={userInfo}
        onUpdateUserInfo={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
