import { MainPageButton } from "../components/molecules/main/MainButton.tsx";
import StarIcon from "../asset/star_empty.svg?react";
import { Icon } from "../components/atoms/icon.tsx";
import { Text } from "../components/atoms/Text.tsx";
import { Button } from "../components/atoms/Button.tsx";
import * as React from "react";
import { MainInfoCardSmall } from "../components/molecules/main/InfoCardSmall.tsx";
import { TodayGoalCard } from "../components/organisms/main/TodayGoldCard.tsx";

const TitleText = (text: string): React.ReactNode => {
  return (
    <Text size={"lg"} color={"white"} weight={"bold"}>
      {text}
    </Text>
  );
};

const SubtitleText = (text: string): React.ReactNode => {
  return (
    <Text size={"xs"} color={"white"} weight={"light"}>
      {text}
    </Text>
  );
};

const ActionButton = (label: string): React.ReactNode => {
  return (
    <Button
      bgColor={"transparent"}
      size={"md"}
      textColor={"white"}
      className={"py-0.5"}
    >
      {label}
    </Button>
  );
};

function TestPageDoh() {
  return (
    <div className={"flex flex-col gap-3"}>
      <MainPageButton
        bgColor={"gradientPeach"}
        icon={<Icon icon={StarIcon} color={"white"} />}
        titleNode={TitleText("주제목")}
        subtitle={SubtitleText("보조 제목")}
        action={ActionButton("버튼")}
      />
      <MainPageButton
        bgColor={"gradientBlue"}
        icon={<Icon icon={StarIcon} color={"white"} />}
        titleNode={TitleText("주제목")}
        subtitle={SubtitleText("보조 제목")}
        action={ActionButton("버튼")}
      />
      <TodayGoalCard />
      <div className={"flex flex-row gap-3"}>
        <MainInfoCardSmall
          bgColor={"gradientRed"}
          titleNode={TitleText("156")}
          subtitleNode={SubtitleText("학습한 단어")}
          emoji={<div>📖</div>}
        ></MainInfoCardSmall>
        <MainInfoCardSmall
          bgColor={"gradientPurple"}
          titleNode={TitleText("7일")}
          subtitleNode={SubtitleText("연속 학습 일수")}
          emoji={<div>🔥</div>}
        ></MainInfoCardSmall>
      </div>
    </div>
  );
}
export default TestPageDoh;
