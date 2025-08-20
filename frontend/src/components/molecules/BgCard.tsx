import React from "react";

type Props = {
  src: string;
  children?: React.ReactNode;
  /** 카드 컨테이너 크기/여백/그리드용 클래스 */
  className?: string;
  /** 내부 패딩이나 레이아웃용 클래스 */
  contentClassName?: string;
  /** 가로:세로 비율 (예: 16/9, 4/3). 고정 높이를 주면 생략해도 됨 */
  ratio?: number;
  /** 이미지 맞춤 */
  fit?: "cover" | "contain"; // 기본 cover
  /** 둥근 모서리 */
  rounded?: string; // 예: "rounded-2xl"
};

export function BgCard({
  src,
  children,
  className = "",
  contentClassName = "",
  ratio,
  fit = "cover",
  rounded = "rounded-2xl",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden shadow ${rounded} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        src={src}
        alt=""
        className={`absolute inset-0 h-full w-full ${
          fit === "contain" ? "object-contain bg-black/5" : "object-cover"
        }`}
        draggable={false}
      />
      {/* 내용물: 자유 배치 영역 */}
      <div className={`relative z-10 h-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
