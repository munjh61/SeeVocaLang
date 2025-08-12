import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import type { Friend } from "../../../api/FriendPageApi";

type MyFriendsContentProps = {
  friends: Friend[];  // 부모로부터 친구목록 전달받음
  onDeleteFriend: (id: number) => void;  // 삭제 콜백
  searchValue?: string
};

export const MyFriendsContent = ({ friends, onDeleteFriend,searchValue = "" }: MyFriendsContentProps) => {
const approvedFriendsCount = friends.filter(f => f.friend_status === "APPROVED").length;

  // 검색어 기준 필터링된 친구 리스트
  const filteredFriends = friends.filter(
  f =>
    f.friend_status === "APPROVED" &&
    f.nickname.toLowerCase().includes((searchValue ?? "").toLowerCase())
);
  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
       <div className="mb-4">
      <Text color="black" size="lg" weight="bold">
        내 친구목록
      </Text>
      <Text color="gray" size="xs">
        {approvedFriendsCount}명의 친구
      </Text>
      </div>
      {filteredFriends.length === 0 ? (
        <div className="text-center mt-8">
          <Text color="gray" size="sm">
            친구를 만들어 친구의 단어장을 구경해보세요
          </Text>
        </div>
      ) : (
        filteredFriends.map(friend => (
          <FriendInfoCard
            key={friend.user_id}
            id={friend.user_id}
            name={friend.nickname}
            profileUrl={friend.profile_url}
            status="APPROVED"
            onDeleteFriend={onDeleteFriend}
          />
        ))
      )}
    </div>
  );
};
