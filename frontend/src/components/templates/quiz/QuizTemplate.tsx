import { useEffect, useMemo, useState } from "react";
import { shuffle } from "lodash-es";
import { useNavigate } from "react-router-dom";
import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import { Quiz } from "../../organisms/quiz/Quiz";
import { SegmentControl } from "../../molecules/segmentControl/SegmentControl";
import { QuizHeader } from "../../organisms/quiz/QuizHeader";
import { Div } from "../../atoms/div/Div";
import { getTodayQuiz } from "../../../api/TodayQuizAPI";

type QuizTemplateProps = {
  name: string;
  description: string;
  vocaCardDatas: VocaCardProps[];
  isTodayMission: boolean;
};

export const QuizTemplate = ({
  vocaCardDatas,
  name,
  description,
  isTodayMission,
}: QuizTemplateProps) => {
  const nav = useNavigate();
  const questionCount = vocaCardDatas.length;

  const [lang, setLang] = useState<"en" | "ko">("en");
  const [quizOrder, setQuizOrder] = useState<VocaCardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(0);

  // 오늘의 학습
  getTodayQuiz();

  // 초기 퀴즈 순서 준비
  useEffect(() => {
    setQuizOrder(shuffle(vocaCardDatas).slice(0, questionCount));
    setCurrentIndex(0);
  }, [vocaCardDatas]);

  // 현재 문제가 없거나 퀴즈 완료 시 처리
  useEffect(() => {
    if (questionCount === 0) return;
    if (currentIndex >= questionCount)
      // if (currentIndex >= 1)
      nav("/done", {
        state: {
          name: name,
          size: questionCount,
          result: result,
        },
      });
  }, [quizOrder, currentIndex, nav]);

  const current = quizOrder[currentIndex];

  // 🔥 useMemo는 조건문 전에 위치해야 함
  const quizDatas = useMemo(() => {
    if (!current) return []; // current가 undefined일 때 방어
    return getQuizOptions(vocaCardDatas, current);
  }, [current, vocaCardDatas]);

  // 조건부 렌더링은 아래에서 처리
  if (!current || quizDatas.length === 0) return null;

  const goToNext = () => setCurrentIndex(prev => prev + 1);

  return (
    <div className="flex flex-col grow p-2 gap-2">
      <QuizHeader
        name={name}
        description={description}
        index={currentIndex + 1}
        total={quizDatas.length + 1}
      />
      <Div bg={"sky"} className="flex flex-col grow rounded-md p-2">
        <div className="flex justify-end">
          <SegmentControl
            options={[
              { label: "영어", value: "en" },
              { label: "한글", value: "ko" },
            ]}
            defaultValue="en"
            onChange={v => {
              if (v === "en" || v === "ko") setLang(v);
            }}
          />
        </div>
        <Quiz
          answerImg={current.imageUrl ?? ""}
          answerEn={current.nameEn}
          answerKo={current.nameKo}
          quizDatas={quizDatas}
          lang={lang}
          onClick={goToNext}
          result={v => setResult(v)}
          classname="grow"
        />
      </Div>
    </div>
  );
};

// 🔹 보기 구성 함수는 따로 뺌
function getQuizOptions(
  all: VocaCardProps[],
  answer: VocaCardProps
): { en: string; ko: string }[] {
  const wrongChoices = shuffle(all.filter(v => v.nameEn !== answer.nameEn))
    .slice(0, 7)
    .map(v => ({ en: v.nameEn, ko: v.nameKo }));

  return shuffle([{ en: answer.nameEn, ko: answer.nameKo }, ...wrongChoices]);
}
