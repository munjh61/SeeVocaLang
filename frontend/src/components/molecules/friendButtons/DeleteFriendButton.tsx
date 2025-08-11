import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import DeleteFriendIcon from "../../../asset/friend_del.svg?react";
import { FriendDeleteConfirmModal } from "../../molecules/friendModal/FriendDeleteModal";
import { deleteFriend } from "../../../api/FriendPageApi";

type DeleteFriendButtonProps = {
  className: string;
  data: number;
  friendName: string; // ✅ 친구 이름도 받아야 모달에서 보여줄 수 있어요
  onRequestComplete: () => void;
};

export const DeleteFriendButton = ({
  className,
  data,
  friendName,
  onRequestComplete
}: DeleteFriendButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteRequest = async () => {
    try {
      setLoading(true);
      const success = await deleteFriend(data); // ✅ API 호출
           if (success) {
             setIsModalOpen(true); // 요청 성공 시 모달 열기
           } else {
             alert("친구 요청에 실패했어요.");
           }
    } catch (error) {
      console.error("친구 삭제 실패:", error);
      alert("친구 삭제에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  
  
  
  
  const handleDelete = () => {
    console.log("삭제할 친구 ID:", data);
    // 여기에 실제 삭제 로직을 추가하세요.
    setIsModalOpen(false);
     onRequestComplete();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        bgColor="red"
        textColor="white"
        size="md"
        className={`gap-1 px-3 py-1.5 ${className}`}
        onClick={handleDeleteRequest} // ✅ 모달 열기
        disabled={loading}
      >
        <div className="flex items-center gap-2">
          <Icon icon={DeleteFriendIcon} color="white" className="w-4 h-4" />
          <Text size="base" color="white" weight="medium">
            친구 삭제
          </Text>
        </div>
      </Button>

      {/* ✅ 모달 렌더링 */}
      <FriendDeleteConfirmModal
        isOpen={isModalOpen}
        friendName={friendName}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </>
  );
};
