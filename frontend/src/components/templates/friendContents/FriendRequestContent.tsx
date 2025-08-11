import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { useEffect, useState } from "react";
import { friendList, type Friend } from "../../../api/FriendPageApi";

type FriendRequestContentProps = {
  userId?: number; // 현재 로그인한 내 ID
};


export const FriendRequestContent = ({ userId }: FriendRequestContentProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await friendList();

      // ✅ pending && receiverId === 내 userId만 필터링
      const filtered = data.filter(
        (f) => f.friend_status === "PENDING" && f.receiver_id === userId
      );

      setFriends(filtered);
    };

    fetchData();
  }, [userId]);

  if (friends.length === 0) {
    return <Text>받은 친구 요청이 없습니다.</Text>;
  }

  return (
     <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto gap-3">
      <Text color="black" size={"lg"} weight={"bold"}>친구요청</Text>
      <Text color="gray" size={"xs"}>{friends.length}개의 요청</Text>
      <div className="space-y-4">
      {friends.map((friend) => (
        <FriendInfoCard
          key={friend.user_id}
          id={friend.user_id}
          name={friend.nickname}
          profileUrl={friend.profile_url}
          status={friend.friend_status}
        />
      ))}
      </div>
    </div>
  );
};