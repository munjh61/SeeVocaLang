import { Button } from "../../atoms/button/Button";
import cardDeco from "../../../asset/png/cardDecoration.png";
import { useState } from "react";
import { Text } from "../../atoms/text/Text";

type QuizButton = {
  en: string;
  ko: string;
  lang: "en" | "ko" | "both";
  answer: boolean;
  onClick: (v: boolean) => void;
  cooltime?: number;
};

export const QuizButton = ({
  en,
  ko,
  lang,
  answer,
  onClick,
  cooltime = 1500,
}: QuizButton) => {
  const [selected, setSelected] = useState(false);
  const selectColor = answer ? "green" : "red";
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // 읽기 속도 (0.1 ~ 10, 기본값: 1)
    utterance.pitch = 1; // 음 높이 (0 ~ 2)
    utterance.volume = 1; // 볼륨 (0 ~ 1)
    window.speechSynthesis.speak(utterance);
  };
  const handleOnclick = () => {
    speak(en);
    setSelected(true);
    setTimeout(() => {
      setSelected(false);
    }, cooltime);
    onClick(answer);
  };
  return (
    <Button
      onClick={handleOnclick}
      textColor={selected ? selectColor : "gray"}
      bgColor={"green"}
      border={"white"}
      className="px-5 py-3 relative shadow-2xl"
    >
      <img
        src={cardDeco}
        className="absolute inset-0 w-full h-full opacity-20 z-0 pointer-events-none"
      />
      <Text font={"outline"} size={"xxxl"} color="white" className="z-10">
        {lang === "en" ? en : ko}
      </Text>
    </Button>
  );
};
