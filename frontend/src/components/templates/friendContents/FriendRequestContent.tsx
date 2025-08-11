import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";
import { Text } from "../../atoms/text/Text";
import { useEffect, useState } from "react";
import { friendList, type Friend } from "../../../api/FriendPageApi";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";



export const FriendRequestContent = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo(); // ✅ 실제 API 호출
      setUserInfo(data); // data에는 nickname, email, profileImage 등이 들어있음
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error);
    }
  };

  fetchUserInfo();
}, []);

  useEffect(() => {
  const fetchFriends = async () => {
    try {
      const friends = await friendList(); // 전체 친구 목록 불러오기

      if (Array.isArray(friends)) {
        // status가 "PENDING"인 친구만 필터링
        const pendingFriends = friends.filter(friend => friend.friend_status === "PENDING" && friend.receiver_id === userInfo?.userId);
        setFriends(pendingFriends);
      } else {
        setFriends([]);
        console.warn("friendList가 배열을 반환하지 않았습니다.");
      }
    } catch (error) {
      console.error("친구 목록 불러오기 실패:", error);
      setFriends([]);
    }
  };

  fetchFriends();
}, []);  

  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
      <Text color="black" size={"lg"} weight={"bold"}>친구요청</Text>
      <Text color="gray" size={"xs"}>{friends.length}개의 요청</Text>
      {friends.map((friend) => (
        <FriendInfoCard
          key={friend.user_id}  // key 추가 필수
          id={friend.user_id}
          name={friend.nickname}
          profileUrl={friend.profile_url}
          status="PENDING"
        />
      ))}
    </div>
  );
};
