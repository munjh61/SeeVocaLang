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
  iconVariant?: Pick<IconVariantProps, "size" | "color" | "rotate">;
  inputVariant?: Pick<InputVariantProps, "scale" | "text">;

  inputValue?: (value: string) => void;
};

export const IconInput = ({
  icon,
  iconVariant,
  inputVariant,
  inputProps,
  className = "",
  inputValue,
}: IconInputProps) => {
  const inputScale = inputVariant?.scale ?? "md";
  const inputText = inputVariant?.text ?? "gray";
  const iconSize = iconVariant?.size ?? "md";
  const iconColor = iconVariant?.color ?? "gray";
  const iconRotate = iconVariant?.rotate;

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(e); // 원래 onKeyDown 먼저 실행
    if (e.key === "Enter" && inputValue) {
      inputValue(e.currentTarget.value);
    }
  };

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <Icon icon={icon} size={iconSize} color={iconColor} rotate={iconRotate} />
      <Input
        scale={inputScale}
        text={inputText}
        {...inputProps}
        onKeyDown={pressEnter}
      />
    </div>
  );
};

// 이런 식으로 쓰면 됨
// import searchSvg from "../asset/search.svg?react";
// import { IconInput } from "../components/layout/book/IconInput";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <div>
//       <IconInput
//         icon={searchSvg}
//         iconVariant={{ color: "blue", size: "md" }}
//         inputValue={handleSearch}
//         inputProps={{}} // Input 변경
//         className="" // 아이콘 + Input을 감싼 div를 변경
//       />
//     </div>
//   );
// }
// export default TestPageMoon;
