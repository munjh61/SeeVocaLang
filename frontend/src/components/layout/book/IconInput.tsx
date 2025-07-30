import { Icon } from "../../atoms/icon";
import { Input } from "../../atoms/Input";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<typeof Input>;
type IconProps = ComponentProps<typeof Icon>;

type IconInputProps = {
  className?: string;
  // variant props를 각각 따로 분리
  iconVariant: IconProps;
  inputVariant?: InputProps;
  // 일반 input HTML 속성들
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  // 함수
  inputValue?: (value: string) => void;
};

export const IconInput = ({
  iconVariant,
  inputVariant,
  inputProps,
  className = "",
  inputValue,
}: IconInputProps) => {
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    inputProps?.onKeyDown?.(e); // 원래 onKeyDown 먼저 실행
    if (e.key === "Enter" && inputValue) {
      inputValue(e.currentTarget.value);
    }
  };

  return (
    <div className={`w-full flex items-center gap-2 ${className}`}>
      <Icon {...iconVariant} />
      <Input {...inputVariant} onKeyDown={pressEnter} />
    </div>
  );
};

// 이런 식으로 쓰면 됨
// import book from "../asset/nav_book.svg?react";
// import { IconInput } from "../components/layout/book/IconInput";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <div>
//       <IconInput
//         iconVariant={{ icon: book }}
//         inputValue={handleSearch}
//       ></IconInput>
//     </div>
//   );
// }
// export default TestPageMoon;
