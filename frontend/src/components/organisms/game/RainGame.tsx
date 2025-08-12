import { shuffle } from "lodash-es";
import { Div } from "../../atoms/div/Div";
import type { VocaCardProps } from "../vocaCard/VocaCard";
import { useMemo, useState } from "react";
import { QuizButton } from "../../molecules/quizButton/QuizButton";

type RainGameProps = {
  vocas: VocaCardProps[];
};

export const RainGame = ({ vocas }: RainGameProps) => {
  const [fallSpeed, setFallSpeed] = useState(0);
  const gameData = shuffle(vocas.splice(0, 10));
  const [currentIndex, setCurrentIndex] = useState(1);
  const current = gameData[currentIndex];
  const buttonDatas = useMemo(() => {
    if (!current) return []; // current가 undefined일 때 방어
    return getQuizOptions(gameData, current);
  }, [current, gameData]);
  const handleOnClick = (v: boolean) => {
    if (v) {
      console.log("정답 로직 짜야함");
    } else {
      console.log("오답 로직 짜야함");
    }
  };
  return (
    <Div>
      {/* 이미지가 떨어지는 영역 */}
      <Div></Div>
      {/* 버튼 영역 */}
      <Div>
        {buttonDatas.map(d => (
          <QuizButton
            key={d.en}
            en={d.en}
            ko={d.ko}
            lang="en"
            onClick={v => handleOnClick(v)}
            answer={current.nameEn === d.en}
          />
        ))}
      </Div>
    </Div>
  );
};

function getQuizOptions(
  all: VocaCardProps[],
  answer: VocaCardProps
): { en: string; ko: string }[] {
  const unique = all
    .filter(Boolean)
    .filter((v, i, arr) => arr.findIndex(x => x.nameEn === v.nameEn) === i);

  const wrongChoices = shuffle(unique.filter(v => v.nameEn !== answer.nameEn))
    .slice(0, 7)
    .map(v => ({ en: v.nameEn, ko: v.nameKo }));

  return shuffle([{ en: answer.nameEn, ko: answer.nameKo }, ...wrongChoices]);
}
