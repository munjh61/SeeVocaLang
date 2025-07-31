import { infoCard } from "../../variants/molecules/main/InfoCardVariants.ts";
import * as React from "react";
import { cn } from "../../../utils/cn.ts";

type InfoCardVariantProps = VariantProps<typeof infoCard>;

type InfoCardSmallProps = {
  bgColor: string;
  titleNode: React.ReactNode;
  subtitleNode: React.ReactNode;
  emoji: React.ReactNode;
  className?: string;
} & InfoCardVariantProps &
  React.HTMLAttributes<HTMLDivElement>;

export const MainInfoCardSmall = ({
  bgColor,
  titleNode,
  subtitleNode,
  emoji,
  className,
  ...props
}: InfoCardSmallProps) => {
  return (
    <div className={cn(infoCard({ bgColor }), className)} {...props}>
      {titleNode}
      {subtitleNode}
      {emoji}
    </div>
  );
};
