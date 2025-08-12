import { textVariants } from "./TextVariants.ts";
import { cn } from "../../../utils/cn.ts";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps = {
  className?: string;
  children?: React.ReactNode;
} & TextVariantProps &
  React.HTMLAttributes<HTMLDivElement>;

export const Text = ({
  size,
  weight,
  color,
  align,
  onlyOneLine,
  font,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <div
      className={cn(
        textVariants({ size, weight, color, align, onlyOneLine, font }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
