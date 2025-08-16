import { useMemo } from "react";
import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import type { Friend } from "../../../api/FriendPageApi";
import { type FriendStatus } from "../../molecules/FriendInfoCard/FriendInfoCard";

const toFriendStatus = (s: string | null | undefined): FriendStatus => {
  switch (s) {
    case "NONE":
    case "REQUEST":
    case "PENDING":
    case "APPROVED":
      return s;
    default:
      return "NONE";
  }
};

type FriendRequestContentProps = {
  userId?: number;
  friends: Friend[];
  searchValue?: string;
  onAcceptFriend: (id: number) => void;
  onDeleteFriend: (id: number) => void;
};

export const FriendRequestContent = ({
  userId,
  friends,
  searchValue = "",
  onAcceptFriend,
  onDeleteFriend,
}: FriendRequestContentProps) => {
  if (!userId) {
    return (
      <div className="flex flex-col px-4 py-2 h-[calc(100vh-160px)] overflow-y-auto">
        <Text color="black" size="xl" weight="bold" font={"outline"}>친구요청</Text>
        <div className="text-center mt-8">
          <Text color="black" size="lg">로그인 후 친구 요청을 확인할 수 있어요.</Text>
        </div>
      </div>
    );
  }

  const query = (searchValue ?? "").toLowerCase().trim();

  const totalRequestCount = useMemo(
    () => friends.filter(f => f.friend_status === "PENDING" && f.receiver_id === userId).length,
    [friends, userId]
  );

  const requestList = useMemo(
    () => friends.filter(
      f =>
        f.friend_status === "PENDING" &&
        f.receiver_id === userId &&
        (f.nickname ?? "").toLowerCase().includes(query)
    ),
    [friends, userId, query]
  );

  return (
    <div className="flex flex-col px-4 py-2 h-[calc(100vh-160px)] overflow-y-auto">
      <div className="mb-4 ml-55">
        <Text color="black" size="xl" weight="bold" font={"outline"}>친구요청</Text>
        <Text color="black" size="sm" font={"outline"}>{totalRequestCount}개의 요청</Text>
      </div>

      {requestList.length === 0 ? (
        <div className="text-center mt-8">
          <Text color="black" size="xl" font={"outline"}>요청목록이 비어있습니다</Text>
        </div>
      ) : (
        <div className="space-y-4">
          {requestList.map((friend) => (
            <FriendInfoCard
              key={friend.user_id}
              id={friend.user_id}
              name={friend.nickname}
              profileUrl={friend.profile_url}
              // ✅ 여기만 변경
              status={toFriendStatus(friend.friend_status)}
              onAcceptFriend={() => onAcceptFriend(friend.user_id)}
              onDeleteFriend={() => onDeleteFriend(friend.user_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
