/**
 * Tape primitives
 * - <Tape>        : 단일 테이프 조각. 위치는 className(absolute 오프셋)으로 제어, 각도는 angle로 제어.
 * - <TapePair>    : 좌/우 한 쌍의 테이프. 상단/하단 코너에 자주 쓰는 구도.
 * - <TapeCorners> : 4개 모서리 테이프 프리셋(프로필 프레임 등).
 *
 * 공통 props
 * - size   : 'sm' | 'md' | 'lg' | 'xl'  (길이/두께 프리셋)
 * - tone   : 'yellow' | 'beige' | 'gray' | 'blue'  (색 프리셋)
 * - angle  : (Tape 전용) 숫자 각도(도 단위, 예: -45, 32)
 * - className : absolute 배치/오프셋과 z-index를 Tailwind로 제어
 *
 * 접근성:
 * - purely decorative → aria-hidden, pointer-events-none 적용
 */

import React from "react";

type TapeSize = "sm" | "md" | "lg" | "xl" | "xs";
type TapeTone = "yellow" | "beige" | "gray" | "blue";

function cn(...xs: Array<string | undefined | false>) {
  return xs.filter(Boolean).join(" ");
}

const sizeClass: Record<TapeSize, string> = {
  sm: "h-3 w-20",
  md: "h-4 w-24",
  lg: "h-4 w-28",
  xl: "h-5 w-36",
  xs: "h-2 w-6",
};

const toneClass: Record<TapeTone, string> = {
  yellow: "bg-yellow-200/90 border-yellow-300/70",
  beige: "bg-amber-100/90  border-amber-200/70",
  gray: "bg-gray-200/90   border-gray-300/70",
  blue: "bg-sky-200/90    border-sky-300/70",
};

type TapeProps = {
  size?: TapeSize;
  tone?: TapeTone;
  /** 회전 각도(도). ex) -45, 32 */
  angle?: number;
  /** absolute 배치/오프셋/z-index는 className으로 제어 */
  className?: string;
  /** 추가 style 주입 (rotate 외 커스텀 필요 시) */
  style?: React.CSSProperties;
};

export const Tape: React.FC<TapeProps> = ({
  size = "md",
  tone = "yellow",
  angle,
  className,
  style,
}) => {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-[2px] border shadow",
        sizeClass[size],
        toneClass[tone],
        // 기본적으로 상단에 오도록 z 부여 (상황에 따라 덮어쓰기 가능)
        "z-[60]",
        className
      )}
      style={{
        rotate: angle !== undefined ? `${angle}deg` : undefined,
        ...style,
      }}
    />
  );
};

/** 좌/우 한 쌍 */
type TapePairProps = {
  size?: TapeSize;
  tone?: TapeTone;
  /** 좌측 테이프 배치용 클래스 (예: "-top-6 -left-8") */
  classNameLeft?: string;
  /** 우측 테이프 배치용 클래스 (예: "-top-6 -right-8") */
  classNameRight?: string;
  angleLeft?: number; // 기본: -35
  angleRight?: number; // 기본: 32
};

export const TapePair: React.FC<TapePairProps> = ({
  size = "lg",
  tone = "yellow",
  classNameLeft,
  classNameRight,
  angleLeft = -35,
  angleRight = 32,
}) => {
  return (
    <>
      <Tape
        size={size}
        tone={tone}
        angle={angleLeft}
        className={classNameLeft}
      />
      <Tape
        size={size}
        tone={tone}
        angle={angleRight}
        className={classNameRight}
      />
    </>
  );
};

/** 네 모서리 프리셋 (프로필 프레임 등) */
type TapeCornersProps = {
  sizeTL?: TapeSize;
  sizeTR?: TapeSize;
  sizeBL?: TapeSize;
  sizeBR?: TapeSize;
  tone?: TapeTone;
  /** 각 모서리 오프셋 클래스 (부모가 relative여야 함) */
  classNameTL?: string; // ex) "-top-5 -left-7"
  classNameTR?: string; // ex) "-top-5 -right-7"
  classNameBL?: string; // ex) "-bottom-5 -left-6"
  classNameBR?: string; // ex) "-bottom-5 -right-6"
  /** 각도 프리셋 */
  angleTL?: number; // 기본: -45
  angleTR?: number; // 기본:  40
  angleBL?: number; // 기본:  40
  angleBR?: number; // 기본: -45
};

export const TapeCorners: React.FC<TapeCornersProps> = ({
  tone = "yellow",
  sizeTL = "lg",
  sizeTR = "lg",
  sizeBL = "md",
  sizeBR = "md",
  classNameTL = "-top-5 -left-7",
  classNameTR = "-top-5 -right-7",
  classNameBL = "-bottom-5 -left-6",
  classNameBR = "-bottom-5 -right-6",
  angleTL = -45,
  angleTR = 40,
  angleBL = 40,
  angleBR = -45,
}) => {
  return (
    <>
      <Tape size={sizeTL} tone={tone} angle={angleTL} className={classNameTL} />
      <Tape size={sizeTR} tone={tone} angle={angleTR} className={classNameTR} />
      <Tape size={sizeBL} tone={tone} angle={angleBL} className={classNameBL} />
      <Tape size={sizeBR} tone={tone} angle={angleBR} className={classNameBR} />
    </>
  );
};
