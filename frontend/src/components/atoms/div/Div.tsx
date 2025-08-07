import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.ts";
import React from "react";
import { DivVariants } from "./DivVariants.ts";

type DivVariantProps = VariantProps<typeof DivVariants>;

type DivProps = {
  className?: string;
  children?: React.ReactNode;
} & DivVariantProps &
  React.ButtonHTMLAttributes<HTMLDivElement>;

export const Div = ({
  bg,
  rounded,
  color,
  border,
  className,
  children,
  align,
  ...props
}: DivProps) => {
  return (
    <div
      className={cn(
        DivVariants({
          border,
          bg,
          rounded,
          color,
          align,
        }),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
