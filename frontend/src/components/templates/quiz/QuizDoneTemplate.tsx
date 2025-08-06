import { Div } from "../../atoms/div/Div";

type QuizDonePageProps = {
  bookname?: string;
  size?: number;
};

export const QuizDoneTemplate = ({
  bookname,
  size: _size,
}: QuizDonePageProps) => {
  // ✅ TS6133: 'size' is declared but its value is never read → _size로 이름 바꿔 경고 제거
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
