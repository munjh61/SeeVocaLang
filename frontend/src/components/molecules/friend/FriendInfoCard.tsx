import { Button } from "../../atoms/button/Button.tsx";
import AddFriendIcon from "../../../asset/friend_add.svg?react";
import DeleteFriendIcon from "../../../asset/friend_del.svg?react";
import WaitFriendIcon from "../../../asset/wait.svg?react";
import type { ComponentProps } from "react";
import { Text } from "../../atoms/text/Text.tsx";

type ButtonProps = ComponentProps<typeof Button>;
type TextProps =ComponentProps<typeof Text>;
type FriendStatus = "none" | "requested"  | "delete" | "response";
type FriendInfoProps = {
  profileUrl?: string;
  name: string;
  status: FriendStatus;
  ButtonVariants: ButtonProps;
  TextVariants: TextProps;
  onAdd?: () => void;
  onDelete?: () => void;
  onAccept?: () => void;
  onRefuse?: () => void;
};

export const FriendInfoCard = ({ profileUrl, name, status, onAdd, onDelete, onAccept, onRefuse }: FriendInfoProps) => {
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
            bgColor="white"
            size="md"
            textColor="purple"
            className="gap-1 px-3 py-1.5"
            disabled
          >
            <WaitFriendIcon className="w-4 h-4" />
            <Text >요청됨</Text>
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
            <Text>친구 삭제</Text>
          </Button>
        );
      case "response":
        return (
          <div className="flex  gap-2">
            <Button
            bgColor="green"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            onClick={onAccept}
          >
            <Text>수락</Text>
          </Button>
          <Button
            bgColor="red"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            onClick={onRefuse}
          >
           <Text>거절</Text>
          </Button>
        </div>
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

    
      {renderButton()}
    </div>
  );
};