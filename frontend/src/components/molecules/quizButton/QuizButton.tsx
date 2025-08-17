import { Button } from "../../atoms/button/Button";
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
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // 읽기 속도 (0.1 ~ 10, 기본값: 1)
    utterance.pitch = 1; // 음 높이 (0 ~ 2)
    utterance.volume = 1; // 볼륨 (0 ~ 1)
    // window.speechSynthesis.speak(utterance);
    s.speak(utterance);
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
      className="px-5 py-3 shadow-2xl"
    >
      <Text
        font={"outline"}
        size={"base"}
        color="white"
        className="sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        {lang === "en" ? en : ko}
      </Text>
    </Button>
  );
};
