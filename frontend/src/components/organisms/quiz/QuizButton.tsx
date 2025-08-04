import { Button } from "../../atoms/button/Button";

type QuizButton = {
  children: string;
  selected: boolean;
  answer: boolean;
  onClick?: () => void;
};

export const QuizButton = ({
  children,
  selected,
  answer,
  onClick,
}: QuizButton) => {
  const selectColor = answer ? "green" : "red";
  return (
    <Button
      onClick={onClick}
      textColor={selected ? "gray" : "white"}
      border={selected ? selectColor : "gray"}
    >
      {children}
    </Button>
  );
};
