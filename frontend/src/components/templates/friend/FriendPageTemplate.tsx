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
  const handleAddFriend = (id: number) => {
    setFriends((prev) =>
      prev.map((f) =>
        f.user_id === id ? { ...f, friend_status: "PENDING", sender_id: userId ?? f.sender_id } : f
      )
    );
  };

  const handleAcceptFriend = async() => {
     try {
    const updatedFriends = await friendList();
    setFriends(updatedFriends);
  } catch (error) {
    console.error("친구 목록 갱신 실패", error);
  }
  };

  const handleDeleteFriend = async() => {
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
