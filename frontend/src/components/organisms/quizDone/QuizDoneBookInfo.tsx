import { Div } from "../../atoms/div/Div";
import BookOpen from "../../../asset/book.svg?react";
import { QuizDoneInfoCard } from "../../molecules/quizDone/QuizDoneInfoCard";

type Props = {
  bookname: string;
  size: number;
  result: number;
};

export const QuizDoneBookInfo = ({ bookname, size, result }: Props) => {
  return (
    <Div bg="white" align="center" className="w-full rounded-b-xl pb-2 px-2">
      <QuizDoneInfoCard
        icon={BookOpen}
        title="완료한 단어장"
        data={bookname}
        titleColor="yellow"
        dataColor="gray"
      />

      <Div align="center" className="grid grid-cols-2 w-full mt-2">
        <QuizDoneInfoCard
          icon={BookOpen}
          title="푼 문제 수"
          data={`${size} 개`}
          titleColor="green"
          dataColor="gray"
        />
        <QuizDoneInfoCard
          icon={BookOpen}
          title="최대 콤보"
          data={`${result} 개`}
          titleColor="blue"
          dataColor="gray"
        />
      </Div>
    </Div>
  );
};
