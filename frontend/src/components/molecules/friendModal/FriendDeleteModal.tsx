import { Button } from "../../atoms/button/Button";
import { Modal } from "../../atoms/modal/modal";


type FriendDeleteConfirmModalProps = {
  isOpen: boolean;
  friendName: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const FriendDeleteConfirmModal = ({
  isOpen,
  friendName,
  onCancel,
  onDelete,
}: FriendDeleteConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col items-center text-center gap-4">
        <div className="text-4xl text-orange-500">⚠️</div>
        <h2 className="text-xl font-bold text-orange-600">친구삭제 확인</h2>
        <p className="text-gray-700">
          정말로 <b>{friendName}</b>님을 친구목록에서 삭제하시겠습니까?
        </p>
        <p className="text-sm text-gray-400">삭제된 친구는 다시 추가할 수 있습니다.</p>
        <div className="flex gap-4 mt-6">
          <Button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl"
          >
            취소
          </Button>
          <Button
            onClick={onDelete}
            className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl"
          >
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
};
