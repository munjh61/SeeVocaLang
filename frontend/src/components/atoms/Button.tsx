import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../variants/atoms/ButtonVariants.ts";
import { cn } from "../../utils/cn.ts";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
} & ButtonVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  bgColor,
  size,
  textColor,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ bgColor, size, textColor }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
