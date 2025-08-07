import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { useNavigate } from "react-router-dom";

export const QuizDoneButtons = () => {
  const navigate = useNavigate();

  return (
    <Div className="space-y-4">
      {/* 다시 해볼래요 → quiz 재시작 */}
      <Button
        size="lg"
        bgColor="green"
        textColor="white"
        rounded="lg"
        className="w-full py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        onClick={() => navigate(-1)} // 이전 페이지로
      >
        ⚡ 다시 해볼래요 ⚡
      </Button>

      {/* 새로운 단어장 → 단어장 선택 페이지로 */}
      <Button
        size="lg"
        bgColor="purple"
        textColor="white"
        rounded="lg"
        className="w-full py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        onClick={() => navigate("/book")} // 예시 경로, 너가 쓰는 단어장 경로로 수정 가능
      >
        단어장 페이지로
      </Button>
    </Div>
  );
};
