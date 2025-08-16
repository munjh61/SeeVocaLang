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
  <div className="w-full max-w-sm p-6 flex flex-col items-center text-center gap-3">
    <div className="text-4xl text-green-500">✅</div>
    <h2 className="text-lg font-bold">친구 추가 완료</h2>
    <p className="text-sm text-gray-600">
      친구 추가가 성공적으로 완료되었습니다.
    </p>
    <Button
      onClick={onConfirm}
      className="mt-2 px-6 py-2 bg-indigo-500 text-white rounded-xl"
    >
      확인
    </Button>
  </div>
</Modal>

  );
};
