import { Modal } from "../../atoms/modal/modal";
import { Text } from "../../atoms/text/Text";
import penguinAndCrododile from "../../../asset/png/penguinAndCrocodile.png";
import { Dots } from "../../atoms/button/Dots";
import { Override } from "../../atoms/button/Override";
import sea from "../../../asset/png/sea.png";
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
      <div className="flex flex-col items-center gap-4">
        <Text size="xl" className="font-bold text-center">
          {winOrLose ? "승리하였습니다!" : "다시하시겠습니까?"}
        </Text>

        <div
          className="w-full flex items-center justify-center"
          style={{ backgroundImage: `url(${sea})` }}
        >
          <img src={penguinAndCrododile} />
          <div className="w-full grid grid-cols-3 gap-3">
            <QuizDoneInfoCard
              titleColor="red"
              title="정답"
              data={String(answer)}
            />
          </div>
        </div>

        <div className="flex w-full gap-3">
          <Override onClick={onNo} className="min-w-24">
            아니오
          </Override>
          <Dots onClick={onYes} className="min-w-24">
            예
          </Dots>
        </div>
      </div>
    </Modal>
  );
}
