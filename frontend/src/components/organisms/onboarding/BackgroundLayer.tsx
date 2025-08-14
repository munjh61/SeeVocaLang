import React from "react";
import BGImage from "../../../asset/png/summer_background_20_without_text.jpg";

type Props = {
  children?: React.ReactNode;
};

export default function BackgroundLayer({ children }: Props) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* 배경 (버그 수정: contain → object-contain 또는 필요시 object-cover) */}
      <img
        src={BGImage}
        alt=""
        aria-hidden
        className="fixed inset-0 -z-20 h-full w-full"
        draggable={false}
      />
      {/* 가독성 오버레이 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/30 to-white/70 pointer-events-none" />
      {children}
    </div>
  );
}
