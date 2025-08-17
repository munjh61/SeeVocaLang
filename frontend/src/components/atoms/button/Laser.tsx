import type { ButtonProps } from "../../../types/Props";
import { Variants } from "../../../types/Variants";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon/Icon";

export const Laser = ({
  icon,
  onClick,
  children,
  bg,
  border,
  color,
  size,
  hover,
  font,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-center min-w-0",
        "cursor-pointer",
        "py-3 px-6 bg-red-600 border border-red-400 text-red-300 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-red-600/80 transition-all duration-300",
        Variants({ bg, border, color, size, hover, font }),
        className
      )}
    >
      {icon && (
        <Icon
          icon={icon}
          className={cn(Variants({ color }), "w-5 h-5 mr-2 shrink-0 icon")}
        />
      )}
      <span
        className={cn(
          Variants({ color, size, font }),
          "label min-w-0 whitespace-nowrap break-keep truncate leading-none text-center"
        )}
      >
        {children}
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-px bg-red-400 animate-pulse" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-red-400 animate-pulse" />
      </div>
    </button>
  );
};
