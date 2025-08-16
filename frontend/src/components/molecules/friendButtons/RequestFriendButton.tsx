import type React from "react";
import { IconButton } from "../iconButton/IconButton";
import WaitFriendIcon from "../../../asset/wait.svg?react";
import { requestBtn } from "../../../style/friendpage";

type RequestFriendButtonProps = {
  className: string;
  children?: React.ReactNode;
};

export const RequestFriendButton = ({ className }: RequestFriendButtonProps) => {
  return (
    <IconButton
      className={className}
      IconVariant={{
        icon: WaitFriendIcon,
        color:"pirate", // 짙은 레드-브라운 (왁스 씰 느낌)
        className: "w-4 h-4",
      }}
      ButtonVariant={{
        bgColor: "pirate", // 버튼 atom에서 처리
        textColor: "black",
        children: "",
        size: "md",
        className: `${requestBtn}`,
      }}
    >
      요청됨
    </IconButton>
  );
};
