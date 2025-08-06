import type { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import { Text } from "../../atoms/text/Text";

type MyPageHeaderProps = {
  title: string;
  subtitle: string;
  bgColor?: string;
  rightElement?: ReactNode; // 수정 버튼이나 아이콘
  className?: string;
};

export const MyPageHeader = ({
  title,
  bgColor,
  subtitle,
  rightElement,
  className = "",
}: MyPageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-t-xl px-4 py-3 text-white",
        `bg-gradient-to-r ${bgColor}`,
        className
      )}
    >
      <div className="flex flex-col">
        <Text className="text-lg font-semibold" size={"lg"} color="white">
          {title}
        </Text>
        <Text className="text-sm opacity-80" size={"sm"} color="white">
          {subtitle}
        </Text>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};
