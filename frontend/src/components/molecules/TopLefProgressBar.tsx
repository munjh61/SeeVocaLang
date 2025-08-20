import React from "react";
import { ProgressBar } from "./progressbar/ProgressBar.tsx";

type Props = {
  current: number;
  total: number;
  loading?: boolean;
  width?: number; // px
  height?: number;
  className?: string;
  variant?: "inline" | "floating"; // ✅ 배치 방식 선택
};

export const TopLeftProgressBar: React.FC<Props> = ({
  current,
  total,
  loading = false,
  width = 360,
  height = 8,
  className = "",
  variant = "inline", // ✅ 기본은 레이아웃 흐름에 따름
}) => {
  const remaining = Math.max(total - current, 0);

  const base =
    "rounded-lg bg-white/80 backdrop-blur px-6 py-3 shadow-lg border border-black/5 flex flex-col gap-4";
  const pos = variant === "floating" ? "fixed top-4 left-4 z-50" : ""; // ✅ 필요시 떠있는 모드

  return (
    <div className={[base, pos, className].join(" ")}>
      <h3 className="text-sm font-bold text-gray-800">오늘의 학습 현황</h3>

      {loading ? (
        <div
          className="rounded-full bg-gray-200 overflow-hidden"
          style={{ width, height }}
        >
          <div className="h-full w-1/3 animate-pulse bg-gray-300" />
        </div>
      ) : (
        <>
          <div style={{ width }}>
            <ProgressBar
              current={current}
              total={total}
              height={height}
              percentageView
            />
          </div>
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
