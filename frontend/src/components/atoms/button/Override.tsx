import type { ButtonProps } from "../../../types/Props";
import { Variants } from "../../../types/Variants";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon/Icon";

export const Override = ({
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
        "w-full py-3 px-6 bg-yellow-900 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-yellow-800 transition-all duration-300",
        className
      )}
    >
      {icon && (
        <Icon
          icon={icon}
          className={cn(Variants({ color }), "inline-block w-5 h-5 mr-2")}
        />
      )}
      <span className={cn(Variants({ color, size, font }), "flex-wrap")}>
        {children}
      </span>
      <div className="absolute top-0 left-0 w-0 h-full bg-yellow-400/30 group-hover:w-full transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </button>
  );
};
