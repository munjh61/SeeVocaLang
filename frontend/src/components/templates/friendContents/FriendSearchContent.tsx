import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";

type FriendStatus = "NONE" | "PENDING" | "APPROVED";
// 🟡 DUMMY_FRIENDS 가져오기 (실제로는 외부 파일에서 import 하셔야겠죠)
const DUMMY_FRIENDS: {
  id: number;
  name: string;
  profileUrl: string;
  status: FriendStatus;  // ✅ 여기!
}[] = [
  { id: 1, name: "홍길동", profileUrl: "/profile1.jpg", status: "NONE" },
  { id: 2, name: "김철수", profileUrl: "/profile2.jpg", status: "PENDING" },
  { id: 3, name: "박영희", profileUrl: "/profile3.jpg", status: "NONE" },
];
type FriendSearchContentProps = {
  searchValue: string;
};

export const FriendSearchContent = ({ searchValue }: FriendSearchContentProps) => {
  // 🔍 소문자 기준으로 친구 이름 필터링
  const filteredFriends = DUMMY_FRIENDS.filter((friend) =>
    friend.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
   <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
  <div className="mb-4">
    <Text color="black" size="lg" weight="bold">새로운 친구 찾기</Text>
    <Text color="gray" size="xs">새로운 학습 파트너를 찾아보세요</Text>
  </div>

  <div className="flex flex-col gap-3">
    {filteredFriends.map((friend) => (
      <FriendInfoCard
        id={friend.id}
        name={friend.name}
        profileUrl={friend.profileUrl}
        status={friend.status}
      />
    ))}
  </div>

  {filteredFriends.length === 0 && (
    <div className="text-center mt-8">
      <Text color="black" size="lg" weight="bold">
        검색 결과가 없습니다
      </Text>
      <Text color="gray" size="xs">다른 이름을 입력해보세요</Text>
    </div>
  )}
</div>

  );
};
