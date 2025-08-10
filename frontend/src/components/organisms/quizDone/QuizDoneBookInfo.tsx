import { Div } from "../../atoms/div/Div";
import folderOpen from "../../../asset/folder.svg?react";
import { QuizDoneInfoCard } from "../../molecules/quizDone/QuizDoneInfoCard";

type QuizDonefolderInfoProps = {
  name: string;
  size: number;
  result: number;
};

export const QuizDonefolderInfo = ({
  name,
  size,
  result,
}: QuizDonefolderInfoProps) => {
  return (
    <Div bg="white" align="center" className="w-full rounded-b-xl pb-2 px-2">
      <QuizDoneInfoCard
        icon={folderOpen}
        title="완료한 단어장"
        data={name}
        titleColor="yellow"
        dataColor="gray"
      />

      <Div align="center" className="grid grid-cols-2 w-full mt-2">
        <QuizDoneInfoCard
          icon={folderOpen}
          title="푼 문제 수"
          data={`${size} 개`}
          titleColor="green"
          dataColor="gray"
        />
        <QuizDoneInfoCard
          icon={folderOpen}
          title="최대 콤보"
          data={`${result} 개`}
          titleColor="blue"
          dataColor="gray"
        />
      </Div>
    </Div>
  );
};
