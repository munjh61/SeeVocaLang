import type { ComponentProps } from "react";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/icon";
import { useNavigate } from "react-router-dom";

type IconProps = ComponentProps<typeof Icon>;
type ButtonProps = ComponentProps<typeof Button>;

type IconButtonProps = {
  // icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  IconVariant: IconProps;
  ButtonVariant: ButtonProps;
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

  const navigate = useNavigate();
  const onClick = () => {
    if (buttonValue && data) buttonValue(data);
    if (path) navigate(path); // 경로 이동
  };
  return (
    <div className={className}>
      <Button
        bgColor={bg}
        textColor={color}
        size={size}
        className="flex items-center gap-2 text-no"
        onClick={onClick}
      >
        <Icon {...IconVariant} />
        {children}
      </Button>
    </div>
  );
};

// 이렇게 쓰면 됨
// import { IconButton } from "../components/layout/book/IconButton";
// import book from "../asset/nav_book.svg?react";

// function TestPageMoon() {
//   return (
//     <div>
//       <IconButton
//         ButtonVariant={{ children: "" }}
//         IconVariant={{ icon: book }}
//       />
//     </div>
//   );
// }
// export default TestPageMoon;
