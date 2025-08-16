import type { ReactNode } from "react";
import { Button } from "../../atoms/button/Button";
import { cn } from "../../../utils/cn";
import { Text } from "../../atoms/text/Text";

type NavTabProps = {
  label: string;
  icon?: ReactNode;
  selected?: boolean;
  badgeCount?: number;
  onClick?: () => void;
};

export const NavTab = ({
  label,
  icon,
  selected = false,
  badgeCount,
  onClick,
}: NavTabProps) => {
  return (
    <Button
      onClick={onClick}
      role="tab"
      aria-selected={selected}
      // atom props는 그대로 사용
      bgColor={selected ? "black" : "black"}
      size="md"
      textColor={selected ? "black" : "black"}
      className={cn(
        // 레이아웃
        "relative inline-flex items-center gap-2 h-9 px-3 rounded-full select-none",
        // 기본 톤(양피지 위)
        "border-2 border-[#2b1e12] bg-[#fffaf0]/70",
        // 이동/트랜지션
        "transition-all will-change-transform",
        // 선택/비선택 상태
        selected
          ? [
              "shadow-[0_3px_0_#1a120b]",
              "ring-1 ring-black/10",
              "font-semibold",
            ].join(" ")
          : [
              "hover:bg-[#fff1c7]/80 hover:-translate-y-[1px]",
              "active:translate-y-0",
              "focus-visible:ring-2 focus-visible:ring-[#f4c430]",
            ].join(" ")
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span className="text-sm"><Text size="base" font={"outline"} >{label}</Text></span>

      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className="
            absolute -top-2 -right-2 min-w-5 h-5 px-1
            flex items-center justify-center
            rounded-full
            bg-[#7a1f1f] text-white text-xs font-bold
            shadow-[0_2px_0_#441010]
          "
          aria-label={`${badgeCount}개의 새 요청`}
        >
          {badgeCount}
        </span>
      )}
    </Button>
  );
};
