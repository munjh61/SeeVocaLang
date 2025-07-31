import { Button } from "../../atoms/button/Button";
import { AddFriendButton } from "../friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../friendButtons/DeleteFriendButton";
import { RequestFriendButton } from "../friendButtons/RequestFriendButton";

type FriendStatus = "none" | "requested"  | "delete" | "response";
type FriendInfoProps = {
  profileUrl?: string;
  name: string;
  status: FriendStatus;
  // onAdd?: () => void;
  // onDelete?: () => void;
  // onAccept?: () => void;
  // onRefuse?: () => void;
};

export const FriendInfoCard = ({ profileUrl, name, status }: FriendInfoProps) => {
  const renderButton = () => {
    switch (status) {
      case "none":
        return (
          <AddFriendButton data="user123" className="w-full"/>
        );
      case "requested":
        return (
          <RequestFriendButton className="w-full"/>
        );
      case "delete":
        return (
          <DeleteFriendButton data="user123" className="w-full"/>
        );
      case "response":
        return (
          <div className="flex  gap-2">
            <Button
            bgColor="green"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            // onClick={onAccept}
          >
            수락
          </Button>
          <Button
            bgColor="red"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            // onClick={onRefuse}
          >
            거절
          </Button>
        </div>
      );
    }
  };

  return (
  <div className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-xl shadow-sm">
  <div className="flex items-center gap-4 min-w-0">
    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
      {profileUrl ? (
        <img
          src={profileUrl}
          alt={`${name}의 프로필`}
          className="w-full h-full object-cover"
        />
      ) : null}
    </div>
    <span className="text-sm font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
      {name}
    </span>
  </div>
  <div className="ml-4 flex-shrink-0 w-[120px]">
    {renderButton()}
  </div>
</div>
  );
};