import { textVariants } from "../variants/TextVariants.ts";
import { cn } from "../../utils/cn.ts";
import type { VariantProps } from "class-variance-authority";

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps = {
  className?: string;
  children?: React.ReactNode;
} & TextVariantProps &
  React.HTMLAttributes<HTMLDivElement>;

export const Text = ({
  size,
  weight,
  color,
  align,
  className,
  children,
  ...props
}: TextProps) => {
  return (
    <div
      className={cn(textVariants({ size, weight, color, align }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
