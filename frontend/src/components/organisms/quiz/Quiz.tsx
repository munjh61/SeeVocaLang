import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import correct from "../../../asset/png/correct.png";
import wrong from "../../../asset/png/cross.png";
import { useState } from "react";

export type QuizProps = {
  quizDatas: { en: string; ko: string }[];
  lang: "en" | "ko";
  answerKo: string;
  answerEn: string;
  answerImg: string;
  onClick: () => void;
  result: (maxCombo: number) => void;
  classname?: string;
};

export const Quiz = ({
  quizDatas,
  lang,
  answerImg,
  answerEn,
  answerKo,
  onClick,
  result,
  classname,
}: QuizProps) => {
  const [toggleC, setToggleC] = useState(false);
  const [toggleW, setToggleW] = useState(false);
  const [timer, setTimer] = useState(true);
  const [, setCombo] = useState(0);
  const [, setMaxCombo] = useState(0);
  const feedbackClass =
    "w-64 h-64 z-10 absolute top-1/3 left-1/2 -translate-x-1/2 animate-fade";

  const handleOnclick = (v: boolean) => {
    if (timer) {
      setTimer(false);
      if (v) {
        setToggleW(false);
        setToggleC(true);
        setCombo(prev => {
          const newCombo = prev + 1;
          setMaxCombo(prevMax => {
            const newMax = Math.max(prevMax, newCombo);
            result(newMax); // 여기서 부모에게 전달
            return newMax;
          });
          return newCombo;
        });

        setTimeout(() => {
          setToggleC(false);
          setTimer(true);
          onClick?.();
        }, 1500);
      } else {
        setToggleC(false);
        setToggleW(true);
        setCombo(0);
        setTimeout(() => {
          setToggleW(false);
          setTimer(true);
        }, 1500);
      }
    }
  };

  return (
    <div
      className={`flex flex-col items-center w-full grow p-4 rounded-md gap-2 ${classname}`}
    >
      {toggleC && <img src={correct} className={feedbackClass} />}
      {toggleW && <img src={wrong} className={feedbackClass} />}
      {/* 이미지 영역 */}
      <div className="flex items-center justify-center grow">
        <ImageBox src={answerImg} className="w-[500px] h-[300px]" />
      </div>

      {/* 보기 버튼 영역 */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 w-full px-20">
        {quizDatas.map(data => (
          <QuizButton
            key={data.en}
            en={data.en}
            ko={data.ko}
            lang={lang}
            answer={data.en === answerEn || data.ko === answerKo}
            onClick={handleOnclick}
          />
        ))}
      </div>
    </div>
  );
};
