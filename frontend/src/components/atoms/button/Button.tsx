import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./ButtonVariants.ts";
import { cn } from "../../../utils/cn.ts";
import React from "react";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  clicked?: boolean;
  className?: string;
  children?: React.ReactNode;
} & ButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  bgColor,
  size,
  rounded,
  textColor,
  border,
  className,
  children,
  font,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        buttonVariants({
          border,
          rounded,
          bgColor,
          size,
          textColor,
          font,
        }),
        className
      )}
      {...props}
    >
      <span className={cn(buttonVariants({ size, textColor, font }))}>
        {children}
      </span>
    </button>
  );
};
