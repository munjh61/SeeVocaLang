import { useEffect, useState } from "react";
import { Button } from "../../atoms/button/Button";
import { AddFriendButton } from "../friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../friendButtons/DeleteFriendButton";
import { RequestFriendButton } from "../friendButtons/RequestFriendButton";
import { acceptFriend } from "../../../api/FriendPageApi";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";



type FriendInfoProps = {
  id: number;
  profileUrl?: string;
  name: string;
  status: string;

};

export const FriendInfoCard = ({ id, profileUrl, name, status: initialStatus }: FriendInfoProps) => {

  const [status, setStatus] = useState<string>(initialStatus);
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
//     useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const data = await getUserInfo(); // ✅ 실제 API 호출
//         setUserInfo(data); // data에는 nickname, email, profileImage 등이 들어있음
//       } catch (error) {
//         console.error("유저 정보 불러오기 실패:", error);
//       }
//     };
//     fetchUserInfo();
// }, []);


  const renderButton = () => {
    
    switch (status) {
      case "NONE":
        return (
          <AddFriendButton data= {id} className="w-full" onRequestComplete={() => setStatus("REQUEST")}/>
        );
      case "APPROVED":
        return (
          <DeleteFriendButton data= {id} className="w-full" friendName={name} onRequestComplete={() => setStatus("NONE")}/>
        );
        case "REQUEST":
        return (
          <RequestFriendButton className="w-full" />
        );
      case "PENDING":
        return (
          <div className="flex  gap-2">
            <Button
            bgColor="green"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"      
          >
            수락
          </Button>
          <Button
            bgColor="red"
            size="md"
            textColor="white"
            className="gap-1 px-3 py-1.5"
            onClick={() => acceptFriend(id)}
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