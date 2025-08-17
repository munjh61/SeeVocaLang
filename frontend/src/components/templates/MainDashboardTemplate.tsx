import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileUploadModalFlow } from "../organisms/fileUpload/FileUploadModalFlow";
import { IslandCarousel } from "../organisms/islands/IslandsCarousel.tsx";
import { ISLANDS } from "../organisms/islands/contants.ts";
import type { Island } from "../../types/Islands";
import { todayStudyStatus } from "../../api/TodayStudyStatusApi.ts";
import { TopLeftProgressBar } from "../molecules/TopLefProgressBar.tsx";
import TreasureImg from "../../asset/png/treasure.png";
import Bino from "../../asset/png/pirate-bino_onboat.png";
import { useAuthStore } from "../../stores/AuthStore"; // ✅ 로그아웃 사용

type StudyStatus = { lastSolvedNumber: number; totalProblemCount: number };

export const MainDashboardTemplate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const items = useMemo(() => ISLANDS, []);

  const [loading, setLoading] = useState(true);
  const [studyStatus, setStudyStatus] = useState<StudyStatus | null>(null);

  const logout = useAuthStore(state => state.logout); // ✅ store에서 logout 함수

  // 페이지 로드 시 학습 상태 가져오기
  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const study = await todayStudyStatus();
        if (!alive) return;
        setStudyStatus({
          lastSolvedNumber: study.lastSolvedNumber,
          totalProblemCount: 20,
        });
      } catch (err) {
        console.error("❌ 오늘의 학습현황 불러오기 실패:", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const handleSelect = (island: Island) => {
    if (island.action.type === "modal") {
      setModalOpen(true);
      return;
    }

    if (island.action.type === "link") {
      const to = island.action.to;
      const state =
        island.key === "summer"
          ? { isTodayMission: true }
          : island.key === "candy"
            ? {
                isTodayMission: true,
                startIndex: studyStatus?.lastSolvedNumber ?? 0,
              }
            : undefined;

      navigate(to, state ? { state } : undefined);
    }
  };

  const handleLogout = () => {
    logout(); // ✅ 토큰/유저정보 제거
    navigate("/", { replace: true }); // ✅ 히스토리 대체 → 뒤로가기 불가
  };

  return (
    <div className="relative w-full min-h-dvh box-border pt-3 overscroll-none flex flex-col overflow-x-hidden">
      {/* 상단 바 */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 px-4 z-30 flex-none">
        <TopLeftProgressBar
          current={studyStatus?.lastSolvedNumber ?? 0}
          total={studyStatus?.totalProblemCount ?? 0}
          loading={loading}
          width={300}
          height={8}
          className="w-full sm:w-auto"
        />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
        >
          로그아웃
        </button>
      </div>

      {/* 메인 콘텐츠: 남은 공간 차지 + 자체 스크롤 */}
      <div className="relative z-20 flex-1 overflow-y-auto">
        <IslandCarousel items={items} onSelect={handleSelect} />
      </div>

      {/* 장식 이미지: 부모를 기준으로 absolute.
        만약 이미지 때문에 하단이 잘리면 부모에 pb를 조금 주거나
        이미지를 main 안쪽으로 옮겨주세요. */}
      <img
        src={TreasureImg}
        alt="보물상자"
        style={{ transform: "scaleX(-1)" }}
        className="absolute left-[-20px] bottom-20 w-[16%] max-w-[300px] pointer-events-none"
        draggable={false}
      />
      <img
        src={Bino}
        alt="망원경 해적"
        className="absolute right-[-20px] bottom-20 w-[25%] max-w-[250px] pointer-events-none"
        draggable={false}
      />

      <FileUploadModalFlow
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
