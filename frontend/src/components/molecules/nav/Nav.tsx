// import type { ComponentType, SVGProps } from "react";
// import { Icon } from "../../atoms/icon/Icon";
// import { Text } from "../../atoms/text/Text";
// import type { VariantProps } from "class-variance-authority";
// import { NavVariants } from "./NavVariants";
// import { cn } from "../../../utils/cn";
// import { useNavigate } from "react-router-dom";

// type NavProps = {
//   icon: ComponentType<SVGProps<SVGSVGElement>>;
//   onoff: boolean;
//   path?: string;
//   onClick?: () => void;
//   children?: string;
//   className?: string;
// } & VariantProps<typeof NavVariants>;

// export const Nav = ({
//   icon,
//   onoff,
//   children,
//   bg = onoff ? "blue" : "gray",
//   path,
//   onClick,
//   className,
// }: NavProps) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     onClick?.();
//     if (path) navigate(path);
//   };

//   return (
//     <div
//       className={cn(
//         NavVariants({ bg }),
//         "p-3 inline-flex gap-2 grow justify-center text-center",
//         className
//       )}
//       onClick={handleClick}
//     >
//       <Icon
//         icon={icon}
//         color={onoff ? "white" : "gray"}
//         className="inline-flex"
//       />
//       <Text
//         color={onoff ? "white" : "gray"}
//         className="inline-flex"
//         align={"center"}
//       >
//         {children}
//       </Text>
//     </div>
//   );
// };
// components/molecules/nav/Nav.tsx
import type { ComponentType, SVGProps, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../utils/cn";
import { UnderLine } from "../../atoms/button/UnderLine"; // ✅ 새로 추가
import type { VariantProps } from "class-variance-authority";
import { NavVariants } from "./NavVariants"; // (bg 등 필요 시 유지)

type NavProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onoff: boolean;
  path?: string;
  onClick?: () => void;
  children?: string;
  className?: string;
} & VariantProps<typeof NavVariants>;

export const Nav = ({
  icon,
  onoff,
  children,
  path,
  onClick,
  className,
}: NavProps) => {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    onClick?.();
    if (path) navigate(path);
  };

  return (
    <UnderLine
      icon={icon}
      onClick={handleClick}
      color={"white"}
      font={"hakgyo"}
      size={"xxl"}
      className={cn(
        "grow justify-center rounded-none border-0",
        onoff ? "opacity-100 [&>div:first-of-type]:w-full" : "opacity-70",
        "btn-compact",
        className
      )}
    >
      {children}
    </UnderLine>
  );
};
