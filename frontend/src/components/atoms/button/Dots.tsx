import type { ButtonProps } from "../../../types/Props";
import { Variants } from "../../../types/Variants";
import { cn } from "../../../utils/cn";
import { Icon } from "../icon/Icon";

export const Dots = ({
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
        Variants({ bg, border, color, hover, size, font }),
        "w-full py-3 px-6 bg-purple-900 font-mono uppercase tracking-wider rounded relative overflow-hidden group hover:bg-purple-800 transition-all duration-300",
        className
      )}
    >
      {icon && (
        <Icon
          icon={icon}
          className={cn(Variants({ color }), "inline-block w-5 h-5 mr-2")}
        />
      )}
      <span className={cn(Variants({ color, size, font }), "")}>
        {children}
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 border-2 border-purple-400 rounded-full animate-ping"
            style={{
              left: `${15 + i * 12}%`,
              top: "50%",
              transform: "translateY(-50%)",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
};
