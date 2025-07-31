import type React from "react";
import { IconButton } from "../iconbutton/IconButton";
import WaitFriendIcon from "../../../asset/wait.svg?react";
type RequestFriendButtonProps ={
    className: string;
    children?:React.ReactNode;
};

export const RequestFriendButton =({className}: RequestFriendButtonProps)=>{

    return (
    <IconButton
      className={className}
      IconVariant={{
        icon: WaitFriendIcon,
        color: "purple",
        className: "w-4 h-4",
      }}
      ButtonVariant={{
        bgColor: "white",
        textColor: "purple",
        children: "",
        size: "md",
        className: "gap-1 px-3 py-1.5 ",
      }}
    >
      요청됨
    </IconButton>
  );
};