import type { ComponentProps, ComponentType, SVGProps } from "react";
import { Button } from "../../atoms/Button";
import { Icon } from "../../atoms/icon";

type IconProps = ComponentProps<typeof Icon>;
type ButtonProps = ComponentProps<typeof Button>;

type IconButtonProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
  iconVariant?: IconProps;
  ButtonVariant?: ButtonProps;
  children: React.ReactNode;
  inputValue?: (value: string) => void;
};

export const IconButton = ({
  icon,
  className,
  iconVariant,
  ButtonVariant,
  children,
}: IconButtonProps) => {
  const bg = ButtonVariant?.bgColor;
  const color = ButtonVariant?.textColor;
  const size = ButtonVariant?.size;
  return (
    <div className={className}>
      <Icon icon={icon} {...iconVariant} />
      <Button bgColor={bg} textColor={color} size={size}>
        {children}
      </Button>
    </div>
  );
};
