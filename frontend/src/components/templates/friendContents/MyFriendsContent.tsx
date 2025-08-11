import { useEffect, useState } from "react";
import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { friendList, type Friend } from "../../../api/FriendPageApi";




export const MyFriendsContent = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
  const fetchFriends = async () => {
    try {
      const friends = await friendList(); // 전체 친구 목록 불러오기

      if (Array.isArray(friends)) {
        const pendingFriends = friends.filter(friend => friend.friend_status === "APPROVED");
        setFriends(pendingFriends);
      } else {
        setFriends([]);
        console.warn("friendList가 배열을 반환하지 않았습니다.");
      }
    } catch (error) {
      console.error("친구 목록 불러오기 실패:", error);
      setFriends([]);
    }
  };

  fetchFriends();
}, []); 
  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
      <Text color="black" size="lg" weight="bold">
        내 친구목록
      </Text>
      <Text color="gray" size="xs">
       {friends.length}명의 친구
      </Text>

      {friends.map((friend) => (
        <FriendInfoCard
          key={friend.user_id}  // key 추가 필수
          id={friend.user_id}
          name={friend.nickname}
          profileUrl={friend.profile_url}
          status="APPROVED"
        />
      ))}
    </div>
  );
};
