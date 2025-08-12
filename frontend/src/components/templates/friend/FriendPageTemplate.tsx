import { useEffect, useState } from "react";
import { FriendHeader } from "../../organisms/friendHeader/FriendHeader";
import { MyFriendsContent } from "../friendContents/MyFriendsContent";
import { FriendRequestContent } from "../friendContents/FriendRequestContent";
import { FriendSearchContent } from "../friendContents/FriendSearchContent";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";
import { friendList, type Friend } from "../../../api/FriendPageApi";


type TabKey = "search" | "friend" | "request";
export const FriendPageTemplate = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedTab, setSelectedTab] = useState<TabKey>("search")
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [friends, setFriends] = useState<Friend[]>([]);
    useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(); // ✅ 실제 API 호출
        setUserInfo(data); // data에는 nickname, email, profileImage 등이 들어있음
      } catch (error) {
        console.error("유저 정보 불러오기 실패:", error);
      }
    };
    const fetchFriends = async () => {
      try {
        const data = await friendList();
        if (Array.isArray(data)) setFriends(data);
      } catch (error) {
        console.error("친구 목록 불러오기 실패:", error);
        setFriends([]);
      }
    };
    fetchUserInfo();
     fetchFriends()
}, []);
  const filteredFriends = friends.filter(friend =>
    friend.nickname.toLowerCase().includes(searchValue.toLowerCase())
  );
    return (
    <div className="p-4">
      <FriendHeader
        searchValue={searchValue}
        onSearchChange={e => setSearchValue(e.target.value)}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        friends={friends}  // 친구목록 전달
        userId={userInfo?.userId} // userId 전달 (필요)
      />

      <div className="mt-4">
        {selectedTab === "search" && (
          <FriendSearchContent searchValue={searchValue} userId={userInfo?.userId} />
        )}
        {selectedTab === "friend" && (
          <MyFriendsContent friends={filteredFriends} onDeleteFriend={(id) => {
            setFriends(prev => prev.filter(f => f.user_id !== id));
          }} />
        )}
        {selectedTab === "request" && (
          <FriendRequestContent
            userId={userInfo?.userId}
            friends={filteredFriends}
            onAcceptFriend={(id) => {
              setFriends(prev =>
                prev.map(f => f.user_id === id ? { ...f, friend_status: "APPROVED" } : f)
              );
            }}
            onDeleteFriend={(id) => {
              setFriends(prev => prev.filter(f => f.user_id !== id));
            }}
          />
        )}
      </div>
    </div>
  );
};
