import { useEffect, useState } from "react";
import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { friendList, type Friend } from "../../../api/FriendPageApi";

type FriendSearchContentProps = {
  searchValue: string;
  userId?: number;
};

export const FriendSearchContent = ({ searchValue, userId }: FriendSearchContentProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await friendList();
        if (Array.isArray(data)) setFriends(data);
        else setFriends([]);
      } catch {
        setFriends([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const hasSearch = searchValue.trim().length > 0;

  // 검색어 있을 때만 필터링
  const filteredFriends = hasSearch
    ? friends.filter((friend) =>
        friend.nickname.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
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
            <Text color="gray" size="sm">
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
            }

            return (
              <FriendInfoCard
                key={friend.user_id}
                id={friend.user_id}
                name={friend.nickname}
                profileUrl={friend.profile_url}
                status={statusToPass}
                userid={userId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};