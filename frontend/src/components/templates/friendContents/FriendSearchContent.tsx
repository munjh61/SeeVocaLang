import { useMemo } from "react";
import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { type Friend } from "../../../api/FriendPageApi";
import { type FriendStatus } from "../../molecules/FriendInfoCard/FriendInfoCard";

type FriendSearchContentProps = {
  searchValue: string;
  userId?: number;
  friends: Friend[];
  onAddFriend: (id: number) => void;
  onAcceptFriend: (id: number) => void;
  onDeleteFriend: (id: number) => void;
};


const mapStatusForViewer = (f: Friend, viewerId?: number): FriendStatus => {
  switch (f.friend_status) {
    case "APPROVED":
      return "APPROVED";
    case "REQUEST":
      return "REQUEST"; 
    case "PENDING":
      // if (!viewerId) return "PENDING";
      if (f.receiver_id === viewerId) return "PENDING"; 
      if (f.sender_id === viewerId) return "REQUEST";
      return "NONE"; 
    case "NONE":
    default:
      return "NONE";
  }
};

export const FriendSearchContent = ({
  searchValue,
  userId,
  friends,
  onAddFriend,
  onAcceptFriend,
  onDeleteFriend,
}: FriendSearchContentProps) => {
  const hasSearch = searchValue.trim().length > 0;

  const uniqueFriends = useMemo(() => {
    if (!hasSearch) return [];
    const q = searchValue.toLowerCase().trim(); 
    const filtered = friends.filter((f) =>
      (f.nickname ?? "").toLowerCase().includes(q)
    );
    return Array.from(new Map(filtered.map((f) => [f.user_id, f])).values());
  }, [friends, searchValue, hasSearch]);

  return (
    <div className="flex flex-col px-4 py-2 h-[calc(100vh-160px)] overflow-y-auto">
      <div className="mb-4 ml-10">
        <Text color="black" size="xl" weight="bold" font={"outline"}>
          새로운 친구 찾기
        </Text>
        <Text color="black" size="sm" font={"outline"}>
          새로운 학습 파트너를 찾아보세요
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        {!hasSearch ? (
          <div className="text-center mt-8">
            <Text color="black" size="xl" font={"outline"}>
              친구 닉네임을 입력해 검색해보세요
            </Text>
          </div>
        ) : uniqueFriends.length === 0 ? (
          <div className="text-center mt-8">
            <Text color="black" size="lg" weight="bold">
              검색 결과가 없습니다
            </Text>
            <Text color="gray" size="xs">다른 닉네임을 입력해보세요</Text>
          </div>
        ) : (
          uniqueFriends.map((friend) => {
            const statusToPass = mapStatusForViewer(friend, userId);
            return (
              <FriendInfoCard
                key={`search-${friend.user_id}`}
                id={friend.user_id}
                name={friend.nickname}
                profileUrl={friend.profile_url}
                status={statusToPass}              
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
