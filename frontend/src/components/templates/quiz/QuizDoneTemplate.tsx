import { QuizDoneBookInfo } from "../../organisms/quizDone/QuizDoneBookInfo";
import { QuizDoneStatCard } from "../../organisms/quizDone/QuizDoneStat";
import { QuizDoneButtons } from "../../organisms/quizDone/QuizDoneButtons";
import { Div } from "../../atoms/div/Div";
import { RainyBalls } from "../../atoms/deco/RainyBall";

type QuizDoneTemplateProps = {
  bookname: string;
  size: number;
  result: number;
  day: number;
};

export const QuizDoneTemplate = ({
  bookname,
  size,
  result,
  day,
}: QuizDoneTemplateProps) => {
  return (
    <Div
      align={"center"}
      className="grow p-4 relative overflow-hidden justify-center"
      style={{
        background:
          "linear-gradient(to bottom right, #d8b4fe, #f9a8d4, #93c5fd)",
      }}
    >
      {/* 배경 데코 요소들 */}
      <RainyBalls />

      <Div align={"center"} className="gap-0">
        <QuizDoneStatCard day={day} />
        <QuizDoneBookInfo bookname={bookname} size={size} result={result} />
        <QuizDoneButtons className="mt-10" />
      </Div>
    </Div>
  );
};
