import { Button } from "../../atoms/button/Button";
import { FriendModal } from "../../atoms/modal/friendmodal";

type Props = {
  isOpen: boolean;
  friendName: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const FriendDeleteConfirmModal = ({
  isOpen, friendName, onCancel, onDelete,
}: Props) => (
  <FriendModal
    isOpen={isOpen}
    onClose={onCancel}
    zIndex={200} 
    containerClassName="w-[min(92vw,420px)] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
    blurBackdrop={false}
  >
    <div className="p-6 text-center">
      <div className="text-4xl text-orange-500 mb-2">⚠️</div>
      <h2 className="text-lg font-bold text-orange-600 mb-2">친구삭제 확인</h2>
      <p className="text-gray-700">
        정말로 <b>{friendName}</b>님을 친구목록에서 삭제하시겠습니까?
      </p>
      <p className="text-sm text-gray-400 mt-1">삭제된 친구는 다시 추가할 수 있습니다.</p>

      <div className="flex justify-center gap-3 mt-6">
        <Button onClick={onCancel} className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl">취소</Button>
        <Button onClick={onDelete} className="px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl">삭제</Button>
      </div>
    </div>
  </FriendModal>
);
