import { Button } from "../../atoms/button/Button";
import { Modal } from "../../atoms/modal/modal";



type FriendAddCompleteModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
};

export const FriendAddCompleteModal = ({
  isOpen,
  onConfirm,
}: FriendAddCompleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onConfirm}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="text-4xl text-green-500">✅</div>
        <h2 className="text-xl font-bold">친구추가 완료</h2>
        <p className="text-gray-600">친구추가가 완료되었습니다</p>
        <Button
          onClick={onConfirm}
          className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
};
