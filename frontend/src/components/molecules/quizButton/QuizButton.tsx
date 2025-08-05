import { Button } from "../../atoms/button/Button";
import cardDeco from "../../../asset/png/cardDecoration.png";
import { useState } from "react";

type QuizButton = {
  en: string;
  ko: string;
  lang: "en" | "ko" | "both";
  answer: boolean;
  onClick: (v: boolean) => void;
};

export const QuizButton = ({ en, ko, lang, answer, onClick }: QuizButton) => {
  const [selected, setSelected] = useState(false);
  const selectColor = answer ? "green" : "red";
  const handleOnclick = () => {
    setSelected(true);
    setTimeout(() => {
      setSelected(false);
    }, 1500);
    onClick(answer);
  };
  return (
    <Button
      onClick={handleOnclick}
      size={"word"}
      textColor={selected ? selectColor : "gray"}
      bgColor={"noBg"}
      className="p-10 relative w-full h-full bg-emerald-100 shadow-2xl"
    >
      <img
        src={cardDeco}
        className="absolute inset-0 w-full h-full opacity-20 z-0 pointer-events-none"
      />
      <span className="z-10">{lang === "en" ? en : ko}</span>
    </Button>
  );
};
