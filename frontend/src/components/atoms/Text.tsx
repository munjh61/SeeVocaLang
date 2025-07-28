import { textVariants } from "../variants/TextVariants.ts";
import { cn } from "../../utils/cn.ts";

type TextProps = {
  size?: "sm" | "md" | "lg";
  style?: "main" | "game" | "mypage" | "friend";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>; // ✅ textarea가 아니라 div

export const Text = ({
  style,
  size,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <div className={cn(textVariants({ style, size }), className)} {...props}>
      {children}
    </div>
  );
};
