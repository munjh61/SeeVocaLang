
import type { ReactNode } from "react";
import { Button } from "../../atoms/button/Button.tsx";
import { cn } from "../../../utils/cn";


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
      bgColor={selected ? "pp" : "white"}
      size="md"
      textColor={selected ? "pp" : "gray"}
      className={cn(
        "gap-1 px-3 py-1.5 rounded-full relative",
        selected
          ? "shadow-md font-semibold"
          : "hover:bg-white/30 transition"
      )}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] leading-none font-bold text-white bg-red-500 rounded-full">
          {badgeCount}
        </span>
      )}
    </Button>
  );
};
