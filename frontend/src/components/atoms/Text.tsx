import { textVariants } from "../variants/atoms/TextVariants.ts";
import { cn } from "../../utils/cn.ts";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps = {
  className?: string;
  children?: string;
} & TextVariantProps &
  React.HTMLAttributes<HTMLDivElement>;

export const Text = ({
  size,
  weight,
  color,
  align,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <div
      className={cn(textVariants({ size, weight, color, align }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
