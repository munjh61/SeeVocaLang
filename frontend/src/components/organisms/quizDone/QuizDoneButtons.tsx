import { Laser } from "../../atoms/button/Laser";
import { Div } from "../../atoms/div/Div";
import { useNavigate } from "react-router-dom";

type QuizDoneButtonsProps = {
  className: string;
};

export const QuizDoneButtons = ({ className }: QuizDoneButtonsProps) => {
  const navigate = useNavigate();

  return (
    <Div align={"center"} className={`w-full grid grid-cols-2 ${className}`}>
      <Laser
        onClick={() => {
          navigate("/folder");
        }}
        font={"hakgyo"}
        color={"white"}
        className="rounded-md"
      >
        단어장 페이지로
      </Laser>
      <Laser
        onClick={() => navigate(-1)}
        font={"hakgyo"}
        color={"white"}
        className="rounded-md"
      >
        다시 해볼래요
      </Laser>
    </Div>
  );
};
