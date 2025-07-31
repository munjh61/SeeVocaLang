import { mainPageButton } from "./MainButtonVariants.ts";
import * as React from "react";
import { cn } from "../../../utils/cn.ts";
import type { VariantProps } from "class-variance-authority";

type InfoCardLargeVariantProps = VariantProps<typeof mainPageButton>;

type InfoCardProps = {
  className?: string;
  children: React.ReactNode;
} & InfoCardLargeVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MainInfoCardLarge = ({
  bgColor,
  size,
  className,
  children,
  ...props
}: InfoCardProps) => {
  return (
    <div
      className={cn(mainPageButton({ bgColor, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
