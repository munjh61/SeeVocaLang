import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import type { Friend } from "../../../api/FriendPageApi";

type MyFriendsContentProps = {
  friends: Friend[];  // 부모로부터 친구목록 전달받음
  onDeleteFriend: (id: number) => void;  // 삭제 콜백
};

export const MyFriendsContent = ({ friends, onDeleteFriend }: MyFriendsContentProps) => {
  const approvedFriends = friends.filter(friend => friend.friend_status === "APPROVED");

  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
      <Text color="black" size="lg" weight="bold">
        내 친구목록
      </Text>
      <Text color="gray" size="xs">
        {approvedFriends.length}명의 친구
      </Text>

      {approvedFriends.map(friend => (
        <FriendInfoCard
          key={friend.user_id}
          id={friend.user_id}
          name={friend.nickname}
          profileUrl={friend.profile_url}
          status="APPROVED"
          onDeleteFriend={onDeleteFriend}
        />
      ))}
    </div>
  );
};
