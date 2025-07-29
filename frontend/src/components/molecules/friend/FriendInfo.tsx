import { Button } from "../../atoms/Button";
import AddFriendIcon from "../../../asset/friend_add.svg?react";
import DeleteFriendIcon from "../../../asset/friend_del.svg?react";
import WaitFriendIcon from "../../../asset/wait.svg?react";

type FriendStatus = "none" | "requested" | "friend" | "delete";
type FriendInfoProps = {
  profileUrl?: string;
  name: string;
  status: FriendStatus;
  onAdd?: () => void;
  onDelete?: () => void;
};

export const FriendInfo = ({ profileUrl, name, status, onAdd, onDelete }: FriendInfoProps) => {
  const renderButton = () => {
    switch (status) {
      case "none":
        return (
          <Button
            bgColor="blue"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            onClick={onAdd}
          >
            <AddFriendIcon className="w-4 h-4" />
            친구 추가
          </Button>
        );
      case "requested":
        return (
          <Button
            bgColor="gradientOrange"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            disabled
          >
            <WaitFriendIcon className="w-4 h-4" />
            요청됨
          </Button>
        );
      case "friend":
        return (
          <Button
            bgColor="green"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            disabled
          >
            친구
          </Button>
        );
      case "delete":
        return (
          <Button
            bgColor="red"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            onClick={onDelete}
          >
            <DeleteFriendIcon className="w-4 h-4" />
            친구 삭제
          </Button>
        );
    }
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
          {profileUrl ? (
            <img src={profileUrl} alt={`${name}의 프로필`} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <span className="text-sm font-semibold text-gray-900">{name}</span>
      </div>

      {/* 버튼 렌더링 */}
      {renderButton()}
    </div>
  );
};