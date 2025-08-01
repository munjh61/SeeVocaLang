import {
  InfoCardLarge,
  InfoCardSmall,
} from "../molecules/infoCard/InfoCard.tsx";
import StarIcon from "../../asset/star_empty.svg?react";
import ThunderIcon from "../../asset/thunder.svg?react";
import { Icon } from "../atoms/icon/Icon.tsx";
import { InfoCardProgressBar } from "./InfoCardProgressBar.tsx";

export const MainActionPanel = () => {
  return (
    <div className={"flex flex-col flex-1/2 p-2 gap-2"}>
      <InfoCardLarge
        bgColor={"gradientPurple"}
        icon={<Icon icon={StarIcon} color={"white"} />}
        mainTitle={"오늘의 단어"}
        subTitle={"새로운 어휘 학습"}
        buttonText={"단어 보기"}
        emoji={"📚"}
      />
      <InfoCardLarge
        bgColor={"gradientRed"}
        icon={<Icon icon={ThunderIcon} color={"white"} />}
        mainTitle={"오늘의 학습!"}
        subTitle={"맞춤형 학습 시작"}
        buttonText={"학습 시작하기"}
        emoji={"⚡️"}
      />
      <InfoCardProgressBar current={2} total={20} height={8} />

      <div className={"flex flex-row justify-between gap-2"}>
        <InfoCardSmall
          bgColor={"gradientPurple"}
          mainTitle={"156"}
          subTitle={"학습한 단어"}
          emoji={"📖"}
        />
        <InfoCardSmall
          bgColor={"gradientRed"}
          mainTitle={"7일"}
          subTitle={"연속 학습"}
          emoji={"🔥"}
        />
      </div>
    </div>
  );
};
