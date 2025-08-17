import { QuizDoneStatCard } from "../../organisms/quizDone/QuizDoneStat";
import { QuizDoneButtons } from "../../organisms/quizDone/QuizDoneButtons";
import { Div } from "../../atoms/div/Div";
import { RainyBalls } from "../../atoms/deco/RainyBall";
import { QuizDoneInfo } from "../../organisms/quizDone/QuizDoneInfo";
import sea from "../../../asset/png/sea.png";
import happyParrot from "../../../asset/png/happyParrot.png";
import happyPenguin from "../../../asset/png/happyPenguin.png";
import happyCrocodile from "../../../asset/png/happyCrocodile.png";
import happyMonkey from "../../../asset/png/happyMonkey.png";

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
    <div
      className="flex flex-col items-center justify-center grow p-4 relative overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${sea})` }}
    >
      <img
        src={happyMonkey}
        className="absolute left-0 top-0 w-[25%] h-[30%]"
      />
      <img
        src={happyParrot}
        className="absolute right-0 top-0 w-[25%] h-[30%]"
      />
      <img
        src={happyPenguin}
        className="absolute right-0 bottom-0 w-[25%] h-[30%]"
      />
      <img
        src={happyCrocodile}
        className="absolute left-0 bottom-0 w-[25%] h-[30%]"
      />
      {/* 배경 데코 요소들 */}
      <RainyBalls />
      <Div align={"center"} className="gap-0 z-10">
        <QuizDoneStatCard streakDay={streakDay} totalDay={totalDay} />
        <QuizDoneInfo name={name} size={size} result={result} />
        <QuizDoneButtons className="mt-10" />
      </Div>
    </div>
  );
};
