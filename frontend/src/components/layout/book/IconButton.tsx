import type { ComponentProps } from "react";
import type { Button } from "../../atoms/Button";
import type { Icon } from "../../atoms/icon";

type IconProps = ComponentProps<typeof Icon>;
type ButtonProps = ComponentProps<typeof Button>;

type IconButton = {
  iconVariant?: IconProps;
  ButtonVariant?: ButtonProps;
};
