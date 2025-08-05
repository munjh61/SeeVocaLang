import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { QuizButton } from "../../molecules/quizButton/QuizButton";
import correct from "../../../asset/png/correct.png";
import wrong from "../../../asset/png/cross.png";
import { useState } from "react";

export type QuizProps = {
  quizDatas: { en: string; ko: string }[];
  lang: "en" | "ko" | "both";
  answerKo: string;
  answerEn: string;
  answerImg: string;
  onClick: () => void;
  classname?: string;
};

export const Quiz = ({
  quizDatas,
  lang,
  answerImg,
  answerEn,
  answerKo,
  onClick,
  classname,
}: QuizProps) => {
  const [toggleC, setToggleC] = useState(false);
  const [toggleW, setToggleW] = useState(false);
  const feedbackClass =
    "w-48 h-48 z-10 absolute top-1/3 left-1/2 -translate-x-1/2 animate-fade";

  const handleOnclick = (v: boolean) => {
    if (v) {
      setToggleW(false);
      setToggleC(true);
      setTimeout(() => {
        setToggleC(false);
        onClick?.();
      }, 1500);
    } else {
      setToggleC(false);
      setToggleW(true);
      setTimeout(() => {
        setToggleW(false);
      }, 1500);
    }
  };
  return (
    <div className={`flex flex-col item-center relative ${classname}`}>
      {toggleC && <img src={correct} className={feedbackClass} />}
      {toggleW && <img src={wrong} className={feedbackClass} />}
      <ImageBox src={answerImg} className="w-full" />
      <div className="grid grid-cols-4 grid-rows-2 gap-1 w-full">
        {quizDatas.map((data, index) => (
          <QuizButton
            key={`${data.en}-${index}`}
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
