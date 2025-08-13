import type { VariantProps } from "class-variance-authority";
import type {
  ComponentType,
  SVGProps,
  MouseEventHandler,
  ReactNode,
} from "react";
import type { Variants } from "./Variants";

export type ButtonProps = {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
} & VariantProps<typeof Variants>;
