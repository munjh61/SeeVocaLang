import type { ComponentType, SVGProps } from "react";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import type { VariantProps } from "class-variance-authority";
import { NavVariants } from "./NavVariants";
import { cn } from "../../../utils/cn";
import { useNavigate } from "react-router-dom";

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
  bg = onoff ? "blue" : "gray",
  path,
  onClick,
  className,
}: NavProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick?.();
    if (path) navigate(path);
  };

  return (
    <div
      className={cn(
        NavVariants({ bg }),
        "p-3 inline-flex gap-2 w-fit",
        className
      )}
      onClick={handleClick}
    >
      <Icon
        icon={icon}
        color={onoff ? "white" : "gray"}
        className="inline-flex"
      />
      <Text color={onoff ? "white" : "gray"} className="inline-flex">
        {children}
      </Text>
    </div>
  );
};
