import AddFriendIcon from "../../../asset/friend_add.svg?react";
import { useState } from "react";
import { FriendAddCompleteModal } from "../friendModal/FriendAddModal";
import { Button } from "../../atoms/button/Button";
import { Icon } from "../../atoms/icon/Icon";
import { Text } from "../../atoms/text/Text";


type AddFriendButtonProps = {
  className?: string;
  data: number; // 친구 ID 같은 것
  children?: React.ReactNode;
  onRequestComplete: () => void;
};

export const AddFriendButton = ({ className, data,onRequestComplete}: AddFriendButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleFriendRequest = async () => {
    try {
      setLoading(true);
      // await axios.post("/api/friends/request", { friendId: data }); // 💡 백엔드 API 주소 맞게 수정
      setIsModalOpen(true); // ✅ 요청 성공 시 완료 모달 열기
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
      bgColor={"blue"}
      textColor={"white"}
      size={"md"}
      className={`gap-1 px-3 py-1.5 ${className}`}
      onClick={handleFriendRequest}
      disabled={loading}
    >
      <div className="flex items-center gap-2">
        <Icon icon={AddFriendIcon} color={"white"} className="w-4 h-4" />
        <Text size="base" color="white" weight="medium">
          친구 추가
        </Text>
      </div>
    </Button>

    <FriendAddCompleteModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmModal}

      />
      </>
  );
};



