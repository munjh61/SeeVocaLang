import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { type Friend } from "../../../api/FriendPageApi";

type FriendSearchContentProps = {
  searchValue: string;
  userId?: number;
  friends: Friend[]; 
   onAddFriend: (id: number) => void;  
  onAcceptFriend: (id: number) => void;
  onDeleteFriend: (id: number) => void;
};

export const FriendSearchContent = ({ searchValue, userId,friends,onAddFriend,onAcceptFriend, onDeleteFriend}: FriendSearchContentProps) => {

  const hasSearch = searchValue.trim().length > 0;

  // 검색어 있을 때만 필터링
  const filteredFriends = hasSearch
    ? friends.filter((friend) =>
        friend.nickname.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  
  return (
    <div className="flex flex-col px-4 py-2 bg-gray-100 h-[calc(100vh-160px)] overflow-y-auto">
      <div className="mb-4">
        <Text color="black" size="lg" weight="bold">
          새로운 친구 찾기
        </Text>
        <Text color="gray" size="xs">
          새로운 학습 파트너를 찾아보세요
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        {!hasSearch ? (
          <div className="text-center mt-8">
            <Text color="gray" size="xl">
              친구 닉네임을 입력해 검색해보세요
            </Text>
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="text-center mt-8">
            <Text color="black" size="lg" weight="bold">
              검색 결과가 없습니다
            </Text>
            <Text color="gray" size="xs">다른 닉네임을 입력해보세요</Text>
          </div>
        ) :(
          filteredFriends.map((friend) => {
            let statusToPass = friend.friend_status;

            if (friend.friend_status === "PENDING" && userId) {
               if (friend.receiver_id === userId) {
                   statusToPass = "PENDING"; // 내가 받은 요청
                      } else if (friend.sender_id === userId) {
                   statusToPass = "REQUEST"; // 내가 보낸 요청
              }
                    } else if (friend.friend_status === "APPROVED") {
  statusToPass = "APPROVED"; // 친구 상태
                        } else {
                              statusToPass = "NONE"; // 기본값
                      }

            return (
              <FriendInfoCard
                key={friend.user_id}
                id={friend.user_id}
                name={friend.nickname}
                profileUrl={friend.profile_url}
                status={statusToPass}
                userid={userId}
                onAddFriend={() => onAddFriend(friend.user_id)}
                onAcceptFriend={() => onAcceptFriend(friend.user_id)}
                onDeleteFriend={() => onDeleteFriend(friend.user_id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};