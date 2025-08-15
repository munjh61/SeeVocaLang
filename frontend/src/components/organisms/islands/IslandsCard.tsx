import React from "react";
import type { Island } from "../../../types/Islands.ts";

type Props = {
  island: Island;
  diff: number; // 중앙으로부터 거리
  frameW: string;
  frameH: string;
  posStyle: React.CSSProperties;
  scaleStyle: React.CSSProperties;
  onSelect: (island: Island, diff: number) => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
};

export const IslandCard: React.FC<Props> = ({
  island,
  diff,
  frameW,
  frameH,
  posStyle,
  scaleStyle,
  onSelect,
  onMoveLeft,
  onMoveRight,
}) => {
  return (
    <li className="absolute" style={posStyle}>
      <button
        type="button"
        aria-label={island.alt} // 접근성 텍스트
        onClick={() => onSelect(island, diff)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(island, diff);
          }
          if (e.key === "ArrowLeft") onMoveLeft();
          if (e.key === "ArrowRight") onMoveRight();
        }}
        className={[
          "group outline-none bg-transparent p-0 block",
          "transition-transform duration-200 ease-out",
          diff === 0 ? "hover:scale-[1.03]" : "hover:scale-[1.02]",
        ].join(" ")}
      >
        <div
          style={{ width: frameW, height: frameH, ...scaleStyle }}
          className="flex items-center justify-center"
        >
          <img
            src={island.src}
            alt={island.alt}
            draggable={false}
            className="w-full h-full object-contain pointer-events-none drop-shadow-md group-hover:drop-shadow-xl transition"
          />
        </div>
      </button>
    </li>
  );
};
