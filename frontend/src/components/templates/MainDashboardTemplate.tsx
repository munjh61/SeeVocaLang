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

type StudyStatus = { lastSolvedNumber: number; totalProblemCount: number };

export const MainDashboardTemplate = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const items = useMemo(() => ISLANDS, []);

  const [loading, setLoading] = useState(true);
  const [studyStatus, setStudyStatus] = useState<StudyStatus | null>(null);

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
          totalProblemCount: 20, // API 값으로 변경 가능
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

  return (
    // ⬇️ relative 추가 (배 이미지 absolute 기준)
    <div className="relative w-full min-h-screen overflow-x-hidden pt-3">
      <TopLeftProgressBar
        current={studyStatus?.lastSolvedNumber ?? 0}
        total={studyStatus?.totalProblemCount ?? 0}
        loading={loading}
        width={300}
        height={8}
      />

      {/* 캐로셀을 위 레이어로 올림 */}
      <div className="relative z-20">
        <IslandCarousel items={items} onSelect={handleSelect} />
      </div>

      {/* 배 이미지: 캐로셀 뒤로 내림 */}
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
        className="absolute right-[-20px] bottom-[-1px] w-[25%] max-w-[250px] pointer-events-none"
        draggable={false}
      />

      <FileUploadModalFlow
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};
