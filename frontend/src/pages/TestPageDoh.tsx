import {
  InfoCardLarge,
  InfoCardSmall,
} from "../components/molecules/infoCard/InfoCard.tsx";
import StarIcon from "../asset/star_empty.svg?react";
import { Icon } from "../components/atoms/icon/Icon.tsx";
import { InfoCardProgressBar } from "../components/organisms/InfoCardProgressBar.tsx";

function TestPageDoh() {
  return (
    <>
      <InfoCardLarge
        bgColor={"gradientPurple"}
        icon={<Icon icon={StarIcon} color={"white"} />}
        mainTitle={"주제목"}
        subTitle={"서브제목"}
        buttonText={"단어보기"}
        emoji={"📚"}
      />
      <InfoCardSmall
        bgColor={"gradientRed"}
        mainTitle={"주제목"}
        subTitle={"서브제목"}
        emoji={"📖"}
      />
      <InfoCardProgressBar
        content={"오늘의 목표"}
        current={8}
        total={20}
        height={8}
      ></InfoCardProgressBar>
    </>
  );
}
export default TestPageDoh;
