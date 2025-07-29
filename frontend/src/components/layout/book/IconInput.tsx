import { Icon } from "../../atoms/icon";
import { Input } from "../../atoms/Input";
import type { ComponentType, SVGProps } from "react";
import type { VariantProps } from "class-variance-authority";
import type { InputVariants } from "../../variants/InputVariants";
import type { iconVariants } from "../../variants/IconVariants";

type InputVariantProps = VariantProps<typeof InputVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

type IconInputProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;

  // 일반 input HTML 속성들
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  // variant props를 각각 따로 분리
  inputVariant?: Pick<InputVariantProps, "scale">;
  iconVariant?: Pick<IconVariantProps, "size" | "color" | "rotate">;
};

export const IconInput = ({
  icon,
  inputProps,
  inputVariant,
  iconVariant,
  className = "",
}: IconInputProps) => {
  const inputScale = inputVariant?.scale ?? "md";
  const iconSize = iconVariant?.size ?? "md";
  const iconColor = iconVariant?.color ?? "gray";
  const iconRotate = iconVariant?.rotate;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon icon={icon} size={iconSize} color={iconColor} rotate={iconRotate} />
      <Input scale={inputScale} {...inputProps} />
    </div>
  );
};
