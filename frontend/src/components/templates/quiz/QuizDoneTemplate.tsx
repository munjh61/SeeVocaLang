import { QuizDoneStatCard } from "../../organisms/quizDone/QuizDoneStat";
import { QuizDoneButtons } from "../../organisms/quizDone/QuizDoneButtons";
import { Div } from "../../atoms/div/Div";
import { RainyBalls } from "../../atoms/deco/RainyBall";
import { QuizDoneInfo } from "../../organisms/quizDone/QuizDoneInfo";

type QuizDoneTemplateProps = {
  name: string;
  size: number;
  result: number;
  streakDay: number;
  totalDay: number;
};

export const QuizDoneTemplate = ({
  name,
  size,
  result,
  streakDay,
  totalDay,
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
        <QuizDoneStatCard streakDay={streakDay} totalDay={totalDay} />
        <QuizDoneInfo name={name} size={size} result={result} />
        <QuizDoneButtons className="mt-10" />
      </Div>
    </Div>
  );
};
