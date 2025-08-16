import { useEffect, useState, useCallback } from "react";
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


  const userId = useAuthStore((s) => s.user?.userId);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendList();
        setFriends(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("친구 목록 불러오기 실패:", error);
        setFriends([]);
      }
    };
    fetchFriends();
  }, []);


  const updateStatusById = useCallback((id: number, nextStatus: Friend["friend_status"]) => {
    setFriends((prev) =>
      prev.map((f) =>
        f.user_id === id ? { ...f, friend_status: nextStatus } : f
      )
    );
  }, []);


  const handleAddFriend = useCallback((id: number) => {
 
    updateStatusById(id, "REQUEST");
  }, [updateStatusById]);

  const handleAcceptFriend = useCallback((id: number) => {
  
    updateStatusById(id, "APPROVED");
  }, [updateStatusById]);

  const handleDeleteFriend = useCallback((id: number) => {

    updateStatusById(id, "NONE");
  }, [updateStatusById]);

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

        <div
      className="
        mt-4 flex-1 min-h-0 overflow-y-auto
        rounded-3xl bg-no-repeat bg-[length:100%_100%]
        px-4 md:px-6 pb-24
      "
     
    >
      <img src=""></img>
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
