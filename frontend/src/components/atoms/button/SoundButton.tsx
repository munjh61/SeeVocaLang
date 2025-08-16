import type { ButtonProps } from "../../../types/Props";
import { Variants } from "../../../types/Variants";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon/Icon";

export const SoundButton = ({
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
        "cursor-pointer",
        "py-3 px-6 bg-indigo-950 text-indigo-300 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-indigo-900 transition-all duration-300",
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
      <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400/30 group-hover:bg-indigo-400 transition-colors duration-300" />
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 w-1 bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            left: `${15 + i * 10}%`,
            height: `${20 + Math.random() * 40}%`,
            animation: `pulse 0.5s infinite ${i * 0.1}s`,
          }}
        />
      ))}
    </button>
  );
};
