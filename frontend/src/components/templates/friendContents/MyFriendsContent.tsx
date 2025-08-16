import { useMemo } from "react";
import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import type { Friend } from "../../../api/FriendPageApi";
import { type FriendStatus } from "../../molecules/FriendInfoCard/FriendInfoCard";

type MyFriendsContentProps = {
  friends: Friend[];            
  onDeleteFriend: (id: number) => void; 
  searchValue?: string;
};

export const MyFriendsContent = ({
  friends,
  onDeleteFriend,
  searchValue = "",
}: MyFriendsContentProps) => {
  
  const approvedUnique = useMemo(() => {
    const map = new Map<number, Friend>();
    for (const f of friends) {
      if (f.friend_status === "APPROVED" && !map.has(f.user_id)) {
        map.set(f.user_id, f);
      }
    }
    return Array.from(map.values());
  }, [friends]);
  const approvedFriendsCount = approvedUnique.length;


const filteredFriends = useMemo(() => {
    const q = (searchValue ?? "").toLowerCase().trim();
    return approvedUnique.filter((f) =>
      (f.nickname ?? "").toLowerCase().includes(q)
    );
  }, [approvedUnique, searchValue]);

  return (
    <div className="flex flex-col px-4 py-2 h-[calc(100vh-160px)] overflow-y-auto">
      <div className="mb-4 ml-10">
        <Text color="black" size="xl" weight="bold" font={"outline"}>
          내 친구목록
        </Text>
        <Text color="black" size="sm" font={"outline"}>
          {approvedFriendsCount}명의 친구
        </Text>
      </div>

      {filteredFriends.length === 0 ? (
        <div className="text-center mt-8">
          <Text color="black" size="xl" font={"outline"}>
            검색 결과가 없습니다
          </Text>
        </div>
      ) : (
        filteredFriends.map((friend) => (
          <FriendInfoCard
            key={friend.user_id}
            id={friend.user_id}
            name={friend.nickname}
            profileUrl={friend.profile_url}
            status={"APPROVED" as FriendStatus}    
            onDeleteFriend={onDeleteFriend}  
          />
        ))
      )}
    </div>
  );
};
