import { CompletionHeader } from "../../organisms/quizDone/quizDoneHeader";
import { BookInfoCard } from "../../organisms/quizDone/quizDoneBookInfo";
import { StatsCard } from "../../organisms/quizDone/QuizDoneStat";
import { MessageCard } from "../../organisms/quizDone/QuizDoneMessageCard";
import { ActionButtons } from "../../organisms/quizDone/QuizDoneActionButton";

type QuizDoneTemplateProps = {
  bookname: string;
  size: number;
};

export const QuizDoneTemplate = ({ bookname, size }: QuizDoneTemplateProps) => {
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
        <CompletionHeader />
        <BookInfoCard bookname={bookname} />
        <StatsCard size={size} />
        <MessageCard />
        <ActionButtons />
      </div>
    </div>
  );
};
