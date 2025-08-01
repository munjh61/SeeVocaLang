import { IconButton } from "../erriconButton/IconButton";
import AddFriendIcon from "../../../asset/friend_add.svg?react";

type AddFriendButtonProps = {
  className?: string;
  // 친구 ID 같은 것
  data: string;
  children?: React.ReactNode;
};

export const AddFriendButton = ({ className, data }: AddFriendButtonProps) => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <IconButton
      className={className}
      IconVariant={{
        icon: AddFriendIcon,
        color: "white",
        className: "w-4 h-4",
      }}
      ButtonVariant={{
        bgColor: "blue",
        textColor: "white",
        children: "",
        size: "md",
        className: "gap-1 px-3 py-1.5 ",
      }}
      data={data}
      buttonValue={handleSearch}
    >
      친구 추가
    </IconButton>
  );
};
