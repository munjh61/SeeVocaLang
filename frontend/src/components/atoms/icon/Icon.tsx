import { type VariantProps } from "class-variance-authority";

import type { ComponentType, SVGProps } from "react";
import { cn } from "../../../utils/cn.ts";
import { iconVariants } from "./IconVariants.ts";

type IconVariants = VariantProps<typeof iconVariants>;

type IconProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
} & IconVariants;

export const Icon = ({
  icon: IconSvg,
  size,
  color,
  rotate,
  className,
}: IconProps) => {
  return (
    <IconSvg className={cn(iconVariants({ size, color, rotate }), className)} />
  );
};
