import React from "react";
import { Modal } from "../../atoms/modal/modal";
import win from "../../../asset/png/pirate_swimming.png";
import lose from "../../../asset/png/pirate_fainted.png";
import sea from "../../../asset/png/sea.png";
import { Dots } from "../../atoms/button/Dots";
import { Override } from "../../atoms/button/Override";
import { QuizDoneInfoCard } from "../quizDone/QuizDoneInfoCard";
import { Text } from "../../atoms/text/Text";

type RainGameOverModalProps = {
  isOpen: boolean;
  score: number;
  round: number;
  speed: number;
  onRetry: () => void;
  onClose: () => void;
};

export const RainGameOverModal: React.FC<RainGameOverModalProps> = ({
  isOpen,
  score,
  round,
  speed,
  onRetry,
  onClose,
}) => {
  const winOrLose = round >= 3;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-[min(560px,92vw)] max-h-[80vh] p-0"
    >
      <div
        className="flex flex-col gap-4 justify-center items-center rounded-md p-4"
        style={{ backgroundImage: `url(${sea})` }}
      >
        <Text
          size="xxl"
          font={"outline"}
          className={`font-bold text-center ${winOrLose ? "text-shadow-cyan-600" : "text-red-400"}`}
        >
          게임 종료
        </Text>
        <div className="w-full flex flex-col items-center p-2 rounded-2xl">
          <img src={winOrLose ? win : lose} className="w-[200px] h-[200px]" />
          <div className="w-full grid grid-cols-3 gap-3">
            <QuizDoneInfoCard
              titleColor="red"
              title="총 정답"
              data={String(score)}
            />
            <QuizDoneInfoCard
              titleColor="green"
              title="진행 라운드"
              data={String(round)}
            />
            <QuizDoneInfoCard
              titleColor="blue"
              title="최종 속도"
              data={String(speed.toFixed(2))}
            />
          </div>
        </div>
        <div className="w-full mt-2 flex gap-2 justify-end">
          <Dots onClick={onClose} font={"hakgyo"} color={"white"}>
            close
          </Dots>
          <Override onClick={onRetry} font={"hakgyo"} color={"white"}>
            replay
          </Override>
        </div>
      </div>
    </Modal>
  );
};
