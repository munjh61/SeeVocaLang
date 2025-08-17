import React from "react";
import { Modal } from "../../atoms/modal/modal";

type RainGameOverModalProps = {
  isOpen: boolean;
  score: number;
  round: number;
  speed: number;
  onRetry: () => void;
  onClose: () => void;
  onExit?: () => void;
};

export const RainGameOverModal: React.FC<RainGameOverModalProps> = ({
  isOpen,
  score,
  round,
  speed,
  onRetry,
  onClose,
  onExit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      panelClassName="w-[min(560px,92vw)] max-h-[80vh] p-6"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">게임 종료</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="text-gray-600">총 정답</div>
          <div className="font-semibold">{score} 개</div>

          <div className="text-gray-600">진행 라운드</div>
          <div className="font-semibold">{round}</div>

          <div className="text-gray-600">최종 속도</div>
          <div className="font-semibold">{speed.toFixed(2)}</div>
        </div>

        <div className="mt-2 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            닫기
          </button>
          {onExit && (
            <button
              onClick={onExit}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              나가기
            </button>
          )}
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            다시하기
          </button>
        </div>
      </div>
    </Modal>
  );
};
