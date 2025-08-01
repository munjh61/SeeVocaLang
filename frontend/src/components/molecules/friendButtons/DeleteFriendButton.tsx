import { IconButton } from "../erriconButton/IconButton";
import DeleteFriendIcon from "../../../asset/friend_del.svg?react";

type DeleteFriendButtonProps = {
  className: string;
  // 친구 ID 같은 것
  data: string;
  children?: React.ReactNode;
};

export const DeleteFriendButton = ({
  className,
  data,
}: DeleteFriendButtonProps) => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <IconButton
      className={className}
      IconVariant={{
        icon: DeleteFriendIcon,
        color: "white",
        className: "w-4 h-4",
      }}
      ButtonVariant={{
        bgColor: "red",
        textColor: "white",
        children: "",
        size: "md",
        className: "gap-1 px-3 py-1.5 ",
      }}
      data={data}
      buttonValue={handleSearch}
    >
      친구 삭제
    </IconButton>
  );
};
