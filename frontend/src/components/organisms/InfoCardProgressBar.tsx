import * as React from "react";

import { ProgressBar } from "../molecules/progressbar/ProgressBar.tsx";
import { Text } from "../atoms/text/Text.tsx";

type InfoCardSmallProps = {
  current: number;
  total: number;
  height: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const getRemainingText = (current: number, total: number) =>
  `목표까지 ${total - current}개 남았어요 화이팅💪`;

export const InfoCardProgressBar = ({
  current,
  total,
  height,
  ...props
}: InfoCardSmallProps) => {
  return (
    <section
      className={
        "bg-gradient-to-r from-[#91DE96] to-[#67B785] px-4 py-2 rounded-sm"
      }
      {...props}
    >
      <div className={"flex flex-row justify-between items-center"}>
        <div className={"flex flex-col gap-1"}>
          <Text color={"white"} weight={"bold"}>{`${current}/${total}`}</Text>
          <Text color={"white"} size={"xs"}>
            "오늘의 목표"
          </Text>
        </div>
        <Text>🎯</Text>
      </div>
      <ProgressBar current={current} total={total} height={height} />
      <Text color={"white"} size={"xs"}>
        {getRemainingText(current, total)}
      </Text>
    </section>
  );
};
