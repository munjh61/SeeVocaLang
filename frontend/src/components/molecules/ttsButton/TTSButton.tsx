import speaker from "../../../asset/speaker.svg?react";
import { IconButton } from "../iconButton/IconButton";

type TTSButtonProps = {
  text: string;
  label?: string;
};
export const TTSButton = ({ text }: TTSButtonProps) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1; // 읽기 속도 (0.1 ~ 10, 기본값: 1)
    utterance.pitch = 1; // 음 높이 (0 ~ 2)
    utterance.volume = 1; // 볼륨 (0 ~ 1)
    window.speechSynthesis.speak(utterance);
  };

  return (
    <IconButton
      IconVariant={{ icon: speaker, color: "white" }}
      ButtonVariant={{
        textColor: "white",
        bgColor: "green",
        className: "font-medium",
      }}
      className="w-[80%]"
      buttonValue={() => speak(text)}
    >
      발음 듣기
    </IconButton>
  );
};
