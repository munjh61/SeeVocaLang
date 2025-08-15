import React from "react";
import { ProgressBar } from "./progressbar/ProgressBar.tsx";

type Props = {
  current: number;
  total: number;
  loading?: boolean;
  width?: number; // px
  height?: number;
  className?: string;
};

export const TopLeftProgressBar: React.FC<Props> = ({
  current,
  total,
  loading = false,
  width = 360,
  height = 8,
  className = "",
}) => {
  // 남은 개수 계산
  const remaining = Math.max(total - current, 0);

  return (
    <div
      className={[
        "fixed top-4 left-4 z-50",
        "rounded-lg bg-white/80 backdrop-blur px-6 py-3 shadow-lg border border-black/5",
        "flex flex-col gap-4",
        className,
      ].join(" ")}
    >
      {/* 제목 */}
      <h3 className="text-sm font-bold text-gray-800">오늘의 학습 현황</h3>

      {loading ? (
        // 로딩 스켈레톤
        <div
          className="rounded-full bg-gray-200 overflow-hidden"
          style={{ width, height }}
        >
          <div className="h-full w-1/3 animate-pulse bg-gray-300" />
        </div>
      ) : (
        <>
          {/* 진행바 */}
          <div style={{ width }}>
            <ProgressBar
              current={current}
              total={total}
              height={height}
              percentageView={true}
            />
          </div>

          {/* 서브 문구 */}
          <p className="text-xs text-gray-600 font-medium">
            목표까지{" "}
            <span className="text-blue-600 font-semibold">{remaining}개</span>{" "}
            남았어요! 화이팅💪
          </p>
        </>
      )}
    </div>
  );
};
