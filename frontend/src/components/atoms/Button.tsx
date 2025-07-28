import { buttonVariants } from "../variants/ButtonVariants.ts";
import { cn } from "../../utils/cn.ts";

type ButtonProps = {
  purpose?: "purple" | "delete" | "cancle";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  purpose,
  size,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ purpose, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};
