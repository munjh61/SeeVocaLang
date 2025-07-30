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
  iconVariant,
  inputProps,
  inputVariant,
  className = "",
}: IconInputProps) => {
  const inputScale = inputVariant?.scale ?? "md";
  const iconSize = iconVariant?.size ?? "md";
  const iconColor = iconVariant?.color ?? "gray";
  const iconRotate = iconVariant?.rotate;

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <Icon icon={icon} size={iconSize} color={iconColor} rotate={iconRotate} />
      <Input scale={inputScale} {...inputProps} />
    </div>
  );
};

// 이런 식으로 쓰면 됨
{
  /* <IconInput
        icon={searchSvg}
        inputProps={{
          placeholder: "검색어를 입력하세요",
          onChange: e => console.log(e.target.value),
        }}
        inputVariant={{ scale: "md" }}
        iconVariant={{ size: "md", color: "blue" }}
        className="w-full"
      /> */
}
