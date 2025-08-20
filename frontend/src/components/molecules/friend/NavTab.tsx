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
      bgColor="black"
      size="md"
      textColor="black"
      className={cn(
        // 레이아웃 고정
        "relative inline-flex items-center gap-1.5 h-9 px-3 rounded-full select-none",
        "whitespace-nowrap break-keep leading-none shrink-0",     // ✅ 줄바꿈 금지 + 수축 금지
        // 폰트 크기: 모바일 조금 작게
        "text-xs sm:text-sm md:text-base",
        // 스타일
        "border-2 border-[#2b1e12] bg-[#fffaf0]/70 transition-all will-change-transform",
        selected
          ? "shadow-[0_3px_0_#1a120b] ring-1 ring-black/10 font-semibold"
          : "hover:bg-[#fff1c7]/80 hover:-translate-y-[1px] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-[#f4c430]"
      )}
    >
      {icon && <span className="w-4 h-4 shrink-0">{icon}</span>}

      {/* Text가 block이면 세로로 쪼개질 수 있어 inline 강제 */}
      <Text
        // Text 컴포넌트가 as 속성을 지원한다면 as="span" 권장
        // as="span"
        size="base"
        font="outline"
        className="inline whitespace-nowrap break-keep leading-none"
      >
        {label}
      </Text>

      {badgeCount && badgeCount > 0 && (
        <span
          className="
            ml-1 min-w-[1.25rem] h-5 px-1
            grid place-items-center
            rounded-full bg-[#7a1f1f] text-white text-[10px] sm:text-xs font-bold
            shadow-[0_2px_0_#441010] shrink-0
          "
          aria-label={`${badgeCount}개의 새 요청`}
        >
          {badgeCount}
        </span>
      )}
    </Button>
  );
};
