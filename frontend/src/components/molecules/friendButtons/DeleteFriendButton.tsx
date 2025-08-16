import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import DeleteFriendIcon from "../../../asset/friend_del.svg?react";
import { FriendDeleteConfirmModal } from "../../molecules/friendModal/FriendDeleteModal";
import { deleteFriend } from "../../../api/FriendPageApi";
import { pirateBtn } from "../../../style/friendpage";

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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const success = await deleteFriend(data); // ✅ API 호출
           if (success) {
            onRequestComplete();
             setIsModalOpen(false); // 요청 성공 시 모달 열기
            alert(`${friendName}님이 친구 목록에서 삭제되었습니다.`);
      } else {
        console.log("11111111111");
        alert("친구 삭제에 실패했어요.");
      }
    } catch (error) {
      console.log("222222222");
      console.error("친구 삭제 실패:", error);
      alert("친구 삭제에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        bgColor="white"
        textColor="black"
        size="md"
        className={`${pirateBtn} ${className ?? ""}`}
        onClick={() => setIsModalOpen(true)} // ✅ 모달 열기
        disabled={loading}
      >
        <div className="flex items-center gap-2">
          <Icon icon={DeleteFriendIcon} color="pirate" className="w-4 h-4"  />
          <Text size="base" color="black" weight="semibold">
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
