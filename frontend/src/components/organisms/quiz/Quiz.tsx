import { shuffle } from "lodash-es";

export type QuizProps = {
  quizDatas: [{ en: string; ko: string }];
};

export const Quiz = ({ quizDatas }: QuizProps) => {
  const list = shuffle(quizDatas);

  return <></>;
};
