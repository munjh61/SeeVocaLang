import type { VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { InputVariants } from "../variants/atoms/InputVariants.ts";

type InputProps = {
  className?: string;
} & VariantProps<typeof InputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ scale, className, ...props }: InputProps) => {
  return (
    <input className={cn(InputVariants({ scale }), className)} {...props} />
  );
};
