import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import type { Friend } from "../../../api/FriendPageApi";


type FriendRequestContentProps = {
  userId?: number; // 내 ID
  friends: Friend[]; // 부모가 관리하는 친구 목록
  searchValue?: string;
  onAcceptFriend: (id: number) => void; // 수락 시 부모에 알림
  onDeleteFriend: (id: number) => void; // 거절 시 부모에 알림
};

export const FriendRequestContent = ({ userId, friends,searchValue = "",onAcceptFriend, onDeleteFriend }: FriendRequestContentProps) => {
  // 내게 온 친구 요청만 필터링
 
  const totalRequestCount = friends.filter(f => f.friend_status === "PENDING" && f.receiver_id === userId).length;
  const requestList = friends.filter(f =>
    f.friend_status === "PENDING" &&
    f.receiver_id === userId &&
    f.nickname.toLowerCase().includes((searchValue ?? "").toLowerCase())  // 검색어 필터링 추가
  );

  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
      <div className="mb-4">
      <Text color="black" size="lg" weight="bold">친구요청</Text>
      <Text color="gray" size="xs">{totalRequestCount}개의 요청</Text>
      </div>
      {requestList.length === 0 ? (
        <div className="text-center mt-8">
          <Text color="gray" size="sm">요청목록이 비어있습니다</Text>
        </div>
      ) : (
        <div className="space-y-4">
          {requestList.map(friend => (
            <FriendInfoCard
              key={friend.user_id}
              id={friend.user_id}
              name={friend.nickname}
              profileUrl={friend.profile_url}
              status={friend.friend_status}
              onAcceptFriend={onAcceptFriend}
              onDeleteFriend={onDeleteFriend}
            />
          ))}
        </div>
      )}
    </div>
  );
};
