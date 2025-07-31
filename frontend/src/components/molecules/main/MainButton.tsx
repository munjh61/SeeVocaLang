import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { mainPageButton } from "../../variants/molecules/main/MainButtonVariants.ts";
import { cn } from "../../../utils/cn.ts";

type MainButtonVariantProps = VariantProps<typeof mainPageButton>;

type MainPageButtonProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  action: React.ReactNode;
  className?: string;
  TestPageDoh?: boolean;
} & MainButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MainPageButton = ({
  icon,
  title,
  subtitle,
  action,
  bgColor,
  size,
  className,
  ...props
}: MainPageButtonProps) => {
  return (
    <button
      className={cn(mainPageButton({ bgColor, size }), className)}
      {...props}
    >
      <div>{icon}</div>
      <div className={"gap-1"}>
        {title}
        {subtitle}
        {action}
      </div>
    </button>
  );
};
