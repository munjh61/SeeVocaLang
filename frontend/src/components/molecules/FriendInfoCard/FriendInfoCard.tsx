import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { AddFriendButton } from "../friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../friendButtons/DeleteFriendButton";
import { RequestFriendButton } from "../friendButtons/RequestFriendButton";
import { acceptFriend, deleteFriend } from "../../../api/FriendPageApi";
import { VocaButton } from "../friendButtons/VocaButton";
import { pirateBtn } from "../../../style/friendpage";
import { Text } from "../../atoms/text/Text";

export type FriendStatus = "NONE" | "REQUEST" | "PENDING" | "APPROVED";

type FriendInfoProps = {
  id: number;
  profileUrl?: string;
  name: string;
  status: FriendStatus;              
  onAddFriend?: (id: number) => void;
  onDeleteFriend?: (id: number) => void;
  onAcceptFriend?: (id: number) => void;
};

export const FriendInfoCard = ({
  id,
  profileUrl,
  name,
  status,                     
  onAddFriend,
  onDeleteFriend,
  onAcceptFriend,
}: FriendInfoProps) => {
  const [mutating, setMutating] = useState<null | "accept" | "refuse">(null);

  const handleAccept = async () => {
    try {
      setMutating("accept");
      const success = await acceptFriend(id);
      if (success) {
        onAcceptFriend?.(id);   
        alert("친구를 수락하셨습니다.")      
      } else {
        alert("친구 수락에 실패했어요.");
      }
    } catch (error) {
      console.error("친구 수락 실패:", error);
      alert("친구 수락에 실패했어요.");
    } finally {
      setMutating(null);
    }
  };

  const handleRefuse = async () => {
    try {
      setMutating("refuse");
      const success = await deleteFriend(id);
      if (success) {
        onDeleteFriend?.(id);    
        alert("친구를 거절하셨습니다.")      
      } else {
        alert("친구 요청 거절에 실패했습니다.");
      }
    } catch {
      alert("친구 요청 거절에 실패했습니다.");
    } finally {
      setMutating(null);
    }
  };

  const renderButton = () => {
    switch (status) {
      case "NONE":
        return (
          <AddFriendButton
            data={id}
            className="w-full"
            onRequestComplete={() => onAddFriend?.(id)} 
          />
        );

      case "APPROVED":
        return (
          <div className="flex flex-col gap-2 w-full">
            <VocaButton data={id} className="w-full" />
            <DeleteFriendButton
              data={id}
              className="w-full"
              friendName={name}
              onRequestComplete={() => onDeleteFriend?.(id)} 
            />
          </div>
        );

      case "REQUEST":
        return <RequestFriendButton className="w-full" />;

      case "PENDING":
        return (
      <div className="flex gap-2 shrink-0">
  {mutating !== "refuse" && (
    <Button
      bgColor="green"
      size="md"
      textColor="black"
      className={`${pirateBtn} w-[96px] h-10 rounded-full flex items-center justify-center`}
      onClick={handleAccept}
      disabled={!!mutating}
      aria-busy={mutating === "accept"}
    >
      <Text className="whitespace-nowrap leading-none font-semibold">
        {mutating === "accept" ? "수락 중..." : "수락"}
      </Text>
    </Button>
  )}

  {mutating !== "accept" && (
    <Button
      bgColor="red"
      size="md"
      textColor="black"
      className={`${pirateBtn} w-[96px] h-10 rounded-full flex items-center justify-center`}
      onClick={handleRefuse}
      disabled={!!mutating}
      aria-busy={mutating === "refuse"}
    >
      <Text className="whitespace-nowrap leading-none font-semibold">
        {mutating === "refuse" ? "거절 중..." : "거절"}
      </Text>
    </Button>
  )}
</div>

        );
    }
  };

  return (
    <div
      className="
        group mx-auto w-full max-w-4xl
        flex items-center justify-between gap-4
        rounded-2xl border-2 border-[#2b1e12]
        bg-[#fff8e6]/85 backdrop-blur-sm
        px-4 py-3
        shadow-[0_6px_0_#2b1e12] ring-1 ring-black/10
        transition hover:shadow-[0_8px_0_#2b1e12]
      "
    >
      {/* 왼쪽: 아바타 + 이름 */}
      <div className="flex items-center gap-4 min-w-0">
        <div
          className="
            w-11 h-11 rounded-full overflow-hidden shrink-0
            ring-2 ring-[#2b1e12] bg-[#fffaf0]
          "
        >
          {profileUrl ? (
            <img
              src={profileUrl}
              alt={`${name}의 프로필`}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <span
            className="
              block text-base font-semibold text-[#2b1e12]
              whitespace-nowrap overflow-hidden text-ellipsis
              drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]
            "
            title={name}
          >
            {name}
          </span>
        </div>
      </div>


      <div className="ml-4 flex-shrink-0 w-[140px]">{renderButton()}</div>
    </div>
  );
};
