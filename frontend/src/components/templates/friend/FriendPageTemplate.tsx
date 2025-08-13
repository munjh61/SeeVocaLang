import { useEffect, useState } from "react";
import { FriendHeader } from "../../organisms/friendHeader/FriendHeader";
import { MyFriendsContent } from "../friendContents/MyFriendsContent";
import { FriendRequestContent } from "../friendContents/FriendRequestContent";
import { FriendSearchContent } from "../friendContents/FriendSearchContent";
import { friendList, type Friend } from "../../../api/FriendPageApi";
import { useAuthStore } from "../../../stores/AuthStore";

type TabKey = "search" | "friend" | "request";
export const FriendPageTemplate = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState<TabKey>("search");
  const [friends, setFriends] = useState<Friend[]>([]);
 const userId = useAuthStore.getState().user?.userId;
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendList();
        if (Array.isArray(data)) setFriends(data);
      } catch (error) {
        console.error("친구 목록 불러오기 실패:", error);
        setFriends([]);
      }
    };
    fetchFriends();
  }, []);

  // --- 상태 변경 핸들러 (모두 여기서)
  const handleAddFriend = (id: number) => {
    // 요청 보낸 상태로 로컬에서 즉시 반영 (optimistic)
    setFriends((prev) =>
      prev.map((f) =>
        f.user_id === id ? { ...f, friend_status: "PENDING", sender_id: userId ?? f.sender_id } : f
      )
    );
  };

  const handleAcceptFriend = async() => {
     try {
    // (삭제 API는 FriendInfoCard 내에서 호출하고 있으므로 여기선 목록 갱신만)
    const updatedFriends = await friendList();
    setFriends(updatedFriends);
  } catch (error) {
    console.error("친구 목록 갱신 실패", error);
  }
  };

  const handleDeleteFriend = async() => {
    // 요청 거절이나 친구 삭제 시 목록에서 제거 (원하면 상태만 NONE으로 바꾸도록 수정 가능)
      try {const updatedFriends = await friendList();
    setFriends(updatedFriends);
  } catch (error) {
    console.error("친구 목록 갱신 실패", error);
  }
  };

  return (
    <div className="p-4">
      <FriendHeader
        searchValue={searchValue}
        onSearchChange={(e) => setSearchValue(e.target.value)}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        friends={friends}
        userId={userId}
      />

      <div className="mt-4">
        {selectedTab === "search" && (
          <FriendSearchContent
            searchValue={searchValue}
            userId={userId}
            friends={friends}
            onAddFriend={handleAddFriend}
            onAcceptFriend={handleAcceptFriend}
            onDeleteFriend={handleDeleteFriend}
          />
        )}
        {selectedTab === "friend" && (
          <MyFriendsContent
            friends={friends}
            searchValue={searchValue}
            onDeleteFriend={handleDeleteFriend}
          />
        )}
        {selectedTab === "request" && (
          <FriendRequestContent
            userId={userId}
            friends={friends}
            searchValue={searchValue}
            onAcceptFriend={handleAcceptFriend}
            onDeleteFriend={handleDeleteFriend}
          />
        )}
      </div>
    </div>
  );
};
