import type { VariantProps } from "class-variance-authority";
import { BallVariants } from "./BallVariants";
import { cn } from "../../../utils/cn";
import penguin from "../../../asset/png/default_profile.png";

type BallVariantProps = VariantProps<typeof BallVariants>;

type BallProps = {
  size: number;
  delay?: number; // 애니메이션 시작 딜레이
  duration?: number; // 애니메이션 지속 시간
  initialLeft?: number; // 시작 위치
} & BallVariantProps;

export const Ball = ({
  size,
  color,
  delay = 0,
  duration = 3000,
  initialLeft = 0,
}: BallProps) => {
  return (
    <>
      <div
        className={cn(
          "absolute rounded-full opacity-60 pointer-events-none",
          BallVariants({ color })
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${initialLeft}%`,
          top: `-10%`, // 시작 위치 위쪽
          animation: `fall ${duration}ms linear infinite`,
          animationDelay: `${delay}ms`,
        }}
      >
        <img src={penguin} />
      </div>

      {/* 컴포넌트 내부에만 적용되는 <style> */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateY(120vh) translateX(50px);
              opacity: 0.3;
            }
          }
        `}
      </style>
    </>
  );
};
