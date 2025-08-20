import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.ts";
import React from "react";
import { DivVariants } from "./DivVariants.ts";

type DivVariantProps = VariantProps<typeof DivVariants>;

type DivProps = {
  className?: string;
  children?: React.ReactNode;
} & DivVariantProps &
  React.HTMLAttributes<HTMLDivElement>;

// forwardRef로 감싸야 ref 전달 가능하게된당...
export const Div = React.forwardRef<HTMLDivElement, DivProps>(
  (
    { bg, rounded, color, border, className, children, align, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
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
  }
);

Div.displayName = "Div";
