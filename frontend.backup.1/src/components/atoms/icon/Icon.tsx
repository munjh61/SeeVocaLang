import { type VariantProps } from "class-variance-authority";

import type { ComponentType, SVGProps } from "react";
import { cn } from "../../../utils/cn.ts";
import { iconVariants } from "./IconVariants.ts";

type IconVariants = VariantProps<typeof iconVariants>;

type IconProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
  className?: string;
} & IconVariants;

export const Icon = ({
  icon: IconSvg,
  size,
  color,
  rotate,
  className,
  onClick,
}: IconProps) => {
  return (
    <IconSvg
      onClick={onClick}
      className={cn(
        iconVariants({ size, color, rotate }),
        "self-center",
        className
      )}
    />
  );
};
