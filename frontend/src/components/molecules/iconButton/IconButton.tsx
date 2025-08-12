import type { ComponentProps } from "react";
import { Button } from "../../atoms/button/Button.tsx";
import { Icon } from "../../atoms/icon/Icon.tsx";
import { useNavigate } from "react-router-dom";

type IconProps = ComponentProps<typeof Icon>;
type ButtonProps = ComponentProps<typeof Button>;

type IconButtonProps = {
  // icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  IconVariant?: IconProps;
  ButtonVariant?: ButtonProps;
  children?: React.ReactNode;
  data?: number | string;
  path?: string;
  state?: any;
  buttonValue?: (value?: number | string) => void;
};

export const IconButton = ({
  // icon,
  className,
  IconVariant,
  ButtonVariant,
  children,
  data,
  path,
  state,
  buttonValue,
}: IconButtonProps) => {
  const bg = ButtonVariant?.bgColor;
  const color = ButtonVariant?.textColor;
  const size = ButtonVariant?.size;
  const border = ButtonVariant?.border;

  const navigate = useNavigate();
  const onClick = () => {
    if (buttonValue) {
      if (data !== undefined) buttonValue(data);
      else buttonValue();
    }
    if (path) navigate(path, { state }); // 경로 이동
  };
  return (
    <div className={`overflow-hidden ${className}`}>
      <Button
        bgColor={bg}
        textColor={color}
        size={size}
        border={border}
        className={`flex items-center gap-2 text-nowrap px-2 py-1 w-full h-full overflow-hidden`}
        type="button"
        onClick={onClick}
      >
        {IconVariant && <Icon {...IconVariant} />}
        {children}
      </Button>
    </div>
  );
};

// 이렇게 쓰면 됨
// import folder from "../asset/nav_folder.svg?react";
// import { IconButton } from "../components/layout/folder/IconButton";

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
//       IconVariant={{ icon: folder, color: "white" }}
//     >
//       학습하기
//     </IconButton>
//   );
// }
// export default TestPageMoon;
