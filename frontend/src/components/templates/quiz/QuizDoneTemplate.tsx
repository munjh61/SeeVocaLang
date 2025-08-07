import { QuizDoneHeader } from "../../organisms/quizDone/QuizDoneHeader";
import { QuizDoneBookInfo } from "../../organisms/quizDone/QuizDoneBookInfo";
import { QuizDoneStatCard } from "../../organisms/quizDone/QuizDoneStat";
import { QuizDoneMessageCard } from "../../organisms/quizDone/QuizDoneMessageCard";
import { QuizDoneButtons } from "../../organisms/quizDone/QuizDoneButtons";

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
    <div
      className="min-h-screen p-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #d8b4fe, #f9a8d4, #93c5fd)",
      }}
    >
      {/* 배경 데코 요소들 */}
      <div className="absolute top-20 left-10 w-8 h-8 bg-yellow-300 rounded-full opacity-60" />
      <div className="absolute top-40 right-16 w-6 h-6 bg-pink-400 rounded-full opacity-50" />
      <div className="absolute bottom-32 left-8 w-10 h-10 bg-blue-400 rounded-full opacity-40" />
      <div className="absolute bottom-60 right-12 w-4 h-4 bg-orange-400 rounded-full opacity-60" />

      <div className="max-w-md mx-auto space-y-6 pt-8">
        <QuizDoneHeader />
        <QuizDoneBookInfo bookname={bookname} size={size} />
        <QuizDoneMessageCard result={result} day={day} />
        <QuizDoneStatCard day={day} />
        <QuizDoneButtons />
      </div>
    </div>
  );
};
