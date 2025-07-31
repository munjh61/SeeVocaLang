import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../../utils/cn.ts";
import { Text } from "../../atoms/text/Text.tsx";
import { Button } from "../../atoms/button/Button.tsx";
import { infoCard } from "./InfoCardVariants.ts";

type InfoCardProps = VariantProps<typeof infoCard>;

type InfoCardBaseProps = {
  icon?: React.ReactNode;
  mainTitle: string;
  subTitle: string;
  buttonText?: string;
  emoji: string;
  className?: string;
  onClick?: () => void;
} & InfoCardProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const InfoCardLarge = ({
  icon,
  mainTitle,
  subTitle,
  buttonText,
  emoji,
  bgColor,
  className,
  ...props
}: InfoCardBaseProps) => {
  return (
    <section
      className={cn(
        infoCard({ bgColor }),
        className,
        "flex-row justify-between"
      )}
      {...props}
    >
      <div className={"flex flex-row gap-4 items-center"}>
        <p>{icon}</p>
        <section className={"flex flex-col pl-4 gap-1"}>
          <Text color={"white"} weight={"bold"}>
            {mainTitle}
          </Text>
          <Text color={"white"} size={"xs"}>
            {subTitle}
          </Text>
          <Button bgColor={"transparent"} textColor={"white"} size={"sm"}>
            {buttonText}
          </Button>
        </section>
      </div>
      <Text size={"lg"}>{emoji}</Text>
    </section>
  );
};

export const InfoCardSmall = ({
  mainTitle,
  subTitle,
  emoji,
  bgColor,
  className,
  ...props
}: InfoCardBaseProps) => {
  return (
    <section
      className={cn(
        infoCard({ bgColor }),
        className,
        "flex-col justify-center"
      )}
      {...props}
    >
      <Text color={"white"} weight={"bold"}>
        {mainTitle}
      </Text>
      <Text color={"white"} size={"xs"}>
        {subTitle}
      </Text>
      <Text size={"xl"}>{emoji}</Text>
    </section>
  );
};
