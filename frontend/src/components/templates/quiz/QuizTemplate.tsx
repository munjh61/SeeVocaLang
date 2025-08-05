import { useEffect, useState } from "react";
import { shuffle } from "lodash-es";
import { useNavigate } from "react-router-dom";
import type { VocaCardProps } from "../../organisms/vocaCard/VocaCard";
import { Quiz } from "../../organisms/quiz/Quiz";
import { SegmentControl } from "../../molecules/segmentControl/SegmentControl";

type QuizTemplateProps = {
  vocaCardDatas: VocaCardProps[];
};

export const QuizTemplate = ({ vocaCardDatas }: QuizTemplateProps) => {
  const nav = useNavigate();
  const questionCount = 5;

  const [lang, setLang] = useState<"en" | "ko">("en");
  const [quizOrder, setQuizOrder] = useState<VocaCardProps[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 초기 퀴즈 순서 준비
  useEffect(() => {
    setQuizOrder(shuffle(vocaCardDatas).slice(0, questionCount));
    setCurrentIndex(0);
  }, [vocaCardDatas]);

  // 현재 문제가 없거나 퀴즈 완료 시 처리
  useEffect(() => {
    if (quizOrder.length === 0) return;
    if (currentIndex >= quizOrder.length) nav("/quiz/done");
  }, [quizOrder, currentIndex, nav]);

  if (quizOrder.length === 0 || currentIndex >= quizOrder.length) return null;

  const current = quizOrder[currentIndex];
  const quizDatas = getQuizOptions(vocaCardDatas, current);

  const goToNext = () => setCurrentIndex(prev => prev + 1);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold mt-4">
        문제 {currentIndex + 1} / {quizOrder.length}
      </h1>
      <SegmentControl
        options={[
          { label: "영어", value: "en" },
          { label: "한글", value: "ko" },
          { label: "복합", value: "both" },
        ]}
        defaultValue="en"
        onChange={v => setLang(v)}
      />
      <Quiz
        answerImg={current.imgUrl ?? ""}
        answerEn={current.nameEn}
        answerKo={current.nameKo}
        quizDatas={quizDatas}
        lang={lang}
        onClick={goToNext}
      />
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
