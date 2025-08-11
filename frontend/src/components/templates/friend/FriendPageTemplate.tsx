import { useEffect, useState } from "react";
import { FriendHeader } from "../../organisms/friendHeader/FriendHeader";
import { MyFriendsContent } from "../friendContents/MyFriendsContent";
import { FriendRequestContent } from "../friendContents/FriendRequestContent";
import { FriendSearchContent } from "../friendContents/FriendSearchContent";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";


type TabKey = "search" | "friend" | "request";
export const FriendPageTemplate = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedTab, setSelectedTab] = useState<TabKey>("search")
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(); // ✅ 실제 API 호출
        setUserInfo(data); // data에는 nickname, email, profileImage 등이 들어있음
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };
    fetchUserInfo();
}, []);
    return(
        <div className="p-4">
           <FriendHeader
             searchValue={searchValue}
             onSearchChange={(e) => setSearchValue(e.target.value)}
             selectedTab={selectedTab}
             setSelectedTab={setSelectedTab}
           />

        <div className="mt-4">
         {selectedTab === "search" && <FriendSearchContent searchValue={searchValue} userId={userInfo?.userId} />}
         {selectedTab === "friend" && <MyFriendsContent />}
         {selectedTab === "request" && <FriendRequestContent userId={userInfo?.userId} />}
       </div> 
     </div>

    );
};