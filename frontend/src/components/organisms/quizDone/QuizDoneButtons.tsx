import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { useNavigate } from "react-router-dom";

type QuizDoneButtonsProps = {
  className: string;
};

export const QuizDoneButtons = ({ className }: QuizDoneButtonsProps) => {
  const navigate = useNavigate();

  return (
    <Div align={"center"} className={`w-full grid grid-cols-2 ${className}`}>
      <Button
        size="lg"
        bgColor="black"
        textColor="white"
        rounded="lg"
        className="w-full py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        onClick={() => navigate(-1)} // 이전 페이지로
      >
        다시 해볼래요
      </Button>
      <Button
        size="lg"
        bgColor="black"
        textColor="white"
        rounded="lg"
        className="w-full py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        onClick={() => navigate("/book")}
      >
        단어장 페이지로
      </Button>
    </Div>
  );
};
