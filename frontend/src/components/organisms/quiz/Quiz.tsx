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
  onClick: (combo: boolean) => void;
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
  const [timer, setTimer] = useState(true);
  const feedbackClass =
    "w-64 h-64 z-10 absolute top-1/3 left-1/2 -translate-x-1/2 animate-fade";

  const handleOnclick = (v: boolean) => {
    if (timer) {
      setTimer(false);
      if (v) {
        // 동그라미 표시 함수
        setToggleW(false);
        setToggleC(true);
        // 동그라미 표시 종료 함수
        setTimeout(() => {
          setToggleC(false);
          setTimer(true);
          onClick?.(true);
        }, 1500);
      } else {
        // 가위 표시 함수
        setToggleC(false);
        setToggleW(true);
        // 가위 표시 종료 함수
        setTimeout(() => {
          setToggleW(false);
          setTimer(true);
          onClick?.(false);
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
      <div className="grid grid-cols-4 grid-rows-2 gap-1 w-full">
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
