import AddFriendIcon from "../../../asset/friend_add.svg?react";
import { useState } from "react";
import { FriendAddCompleteModal } from "../friendModal/FriendAddModal";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";
import { addFriend } from "../../../api/FriendPageApi";
import { pirateBtn } from "../../../style/friendpage";


type AddFriendButtonProps = {
  className?: string;
  data: number; // 친구 ID 같은 것
  children?: React.ReactNode;
  onRequestComplete: () => void;
};

export const AddFriendButton = ({ className,onRequestComplete,data}: AddFriendButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleFriendRequest = async () => {
    try {
      setLoading(true);
       const success = await addFriend(data); // ✅ API 호출
      if (success) {
        setIsModalOpen(true); // 요청 성공 시 모달 열기
      } else {
        alert("친구 요청에 실패했어요.");
      }
    } catch (error) {
      console.error("친구 요청 실패:", error);
      alert("친구 요청에 실패했어요.");
    } finally {
      setLoading(false);
    }
  };

    const handleConfirmModal = () => {
    setIsModalOpen(false);
    onRequestComplete(); // ✅ 부모에게 요청 완료를 알림
  };

  return (
    <>
    <Button
  onClick={handleFriendRequest}
  disabled={loading}
  bgColor="white"
  textColor="black"
  size="md"
  className={`${pirateBtn} ${className ?? ""}`}
>
  <Icon icon={AddFriendIcon} className="w-4 h-4" color="pirate" />
  <Text size="base" weight="semibold" color="black">
    친구 추가
  </Text>
</Button>

    <FriendAddCompleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmModal}

      />
      </>
  );
};



