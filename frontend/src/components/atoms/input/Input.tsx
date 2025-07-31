import type { VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/cn.ts";
import { InputVariants } from "./InputVariants.ts";

type InputProps = {
  className?: string;
} & VariantProps<typeof InputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ scale, text, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(InputVariants({ scale, text }), className)}
      {...props}
    />
  );
};
