import { MainInfoCardLarge } from "./InfoCardLarge.tsx";
import { Text } from "../../atoms/text/Text.tsx";
import { ProgressBar } from "../progressbar/ProgressBar.tsx";

export const TodayGoalCard = () => (
  <MainInfoCardLarge
    bgColor="gradientGreen"
    className="flex flex-col justify-start items-start gap-3"
  >
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col">
        <Text
          color="white"
          size="xl"
          className="font-bold"
          children={"12/20"}
        ></Text>
        <Text color="white" size="xs" children={"오늘의 목표"}></Text>
      </div>
      <div>🎯</div>
    </div>
    <ProgressBar current={12} total={20} height={8} />
    <Text color="white" size="xs" children={"목표까지 10개 남았어요💪"}></Text>
  </MainInfoCardLarge>
);
