import { Div } from "../../atoms/div/Div";

type QuizDonePageProps = {
  bookname?: string;
  size?: number;
};

export const QuizDoneTemplate = ({ bookname, size }: QuizDonePageProps) => {
  return (
    <Div>
      <h1>놀라워요!</h1>
      <h2>단어장의 모든 단어를 완료했어요.</h2>
      <Div>
        <h1>완료한 단어장</h1>
        {bookname}
      </Div>
    </Div>
  );
};
