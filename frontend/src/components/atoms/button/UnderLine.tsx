import type { ButtonProps } from "../../../types/Props";
import { Variants } from "../../../types/Variants";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon/Icon";

export const UnderLine = ({
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
        Variants({ bg, border, color, size, hover, font }),
        "w-full flex items-center justify-center min-w-0",
        "py-3 px-6 bg-blue-400 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-blue-500 transition-all duration-300",
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
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-800 group-hover:w-full transition-all duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};
