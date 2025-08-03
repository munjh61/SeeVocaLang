import type { ComponentProps } from "react";
import { Button } from "../../atoms/button/Button.tsx";
import { Icon } from "../../atoms/icon/Icon.tsx";
import { useNavigate } from "react-router-dom";

type IconProps = ComponentProps<typeof Icon>;
type ButtonProps = ComponentProps<typeof Button>;

type IconButtonProps = {
  // icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  IconVariant: IconProps;
  ButtonVariant?: ButtonProps;
  children?: React.ReactNode;
  data?: string;
  path?: string;
  buttonValue?: (value: string) => void;
};

export const IconButton = ({
  // icon,
  className,
  IconVariant,
  ButtonVariant,
  children,
  data,
  path,
  buttonValue,
}: IconButtonProps) => {
  const bg = ButtonVariant?.bgColor;
  const color = ButtonVariant?.textColor;
  const size = ButtonVariant?.size;
  const border = ButtonVariant?.border;

  const navigate = useNavigate();
  const onClick = () => {
    if (buttonValue && data) buttonValue(data); // ajax 요청할 때 쓰면 될 듯?
    if (path) navigate(path); // 경로 이동
  };
  return (
    <div className={className}>
      <Button
        bgColor={bg}
        textColor={color}
        size={size}
        border={border}
        className="flex items-center gap-2 text-nowrap px-2 py-1 w-full h-full"
        type="button"
        onClick={onClick}
      >
        <Icon {...IconVariant} />
        {children}
      </Button>
    </div>
  );
};

// 이렇게 쓰면 됨
// import book from "../asset/nav_book.svg?react";
// import { IconButton } from "../components/layout/book/IconButton";

// function TestPageMoon() {
//   const handleSearch = (value: string) => {
//     console.log(value);
//   };
//   return (
//     <IconButton
//       ButtonVariant={{
//         bgColor: "blue",
//         children: "",
//         size: "md",
//         textColor: "white",
//       }}
//       path="/"
//       data="하이"
//       // buttonValue={v => console.log(v)}
//       buttonValue={handleSearch}
//       IconVariant={{ icon: book, color: "white" }}
//     >
//       학습하기
//     </IconButton>
//   );
// }
// export default TestPageMoon;
