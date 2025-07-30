import { Icon } from "../../atoms/icon";
import { Input } from "../../atoms/Input";
import type { ComponentProps, ComponentType, SVGProps } from "react";

type InputProps = ComponentProps<typeof Input>;
type IconProps = ComponentProps<typeof Icon>;

type IconInputProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  // variant props를 각각 따로 분리
  iconVariant?: Pick<IconProps, "size" | "color" | "rotate">;
  inputVariant?: InputProps;
  // 일반 input HTML 속성들
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  // 함수
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
