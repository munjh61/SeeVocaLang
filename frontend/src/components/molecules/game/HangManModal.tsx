import { Modal } from "../../atoms/modal/modal";
import { Text } from "../../atoms/text/Text";
import { Dots } from "../../atoms/button/Dots";
import { Override } from "../../atoms/button/Override";
import sea from "../../../asset/png/sea.png";
import win from "../../../asset/png/penguinAndCrocodile.png";
import lose from "../../../asset/png/penguinAndCrocodile_bad.png";
import { QuizDoneInfoCard } from "../quizDone/QuizDoneInfoCard";

type HangmanGameOverModalProps = {
  answer: string;
  winOrLose: boolean;
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
};

export function HangmanGameOverModal({
  answer,
  winOrLose,
  isOpen,
  onYes,
  onNo,
}: HangmanGameOverModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onYes}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      panelClassName="w-[min(92vw,460px)]"
    >
      <div
        className="flex flex-col items-center gap-4 rounded-md py-4"
        style={{ backgroundImage: `url(${sea})` }}
      >
        <Text
          size="xxl"
          font={"outline"}
          className={`font-bold text-center ${winOrLose ? "text-shadow-cyan-600" : "text-red-400"}`}
        >
          {winOrLose ? "승리하였습니다!" : "패배하였습니다."}
        </Text>

        <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
          <img src={winOrLose ? win : lose} className="grow" />
          <QuizDoneInfoCard
            titleColor="red"
            title="정답"
            data={String(answer)}
          />
          <div className="flex w-full gap-3">
            <Override
              onClick={onNo}
              className="min-w-24"
              font={"hakgyo"}
              color={"white"}
            >
              아니오
            </Override>
            <Dots
              onClick={onYes}
              className="min-w-24"
              font={"hakgyo"}
              color={"white"}
            >
              예
            </Dots>
          </div>
        </div>
      </div>
    </Modal>
  );
}
