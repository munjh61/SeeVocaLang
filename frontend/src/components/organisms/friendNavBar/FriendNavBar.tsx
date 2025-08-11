
import SearchIcon from "../../../asset/search.svg?react";
import BellIcon from "../../../asset/bell.svg?react";

import { NavTab } from "../../molecules/friend/NavTab";
import { useEffect, useState } from "react";
import { friendList, type Friend } from "../../../api/FriendPageApi";
import { getUserInfo, type UserInfo } from "../../../api/userInfo";

type TabKey = "search" | "friend" | "request";

type FriendNavBarProps = {
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
};

export const FriendNavBar = ({ selectedTab, setSelectedTab}: FriendNavBarProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [UserInfo, setUserInfo] = useState<UserInfo | null>(null);
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
        const allFriends = await friendList(); // 전체 친구 목록 불러오기
        if (Array.isArray(allFriends)) {
          setFriends(allFriends);
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

  // "PENDING" 상태인 친구 수 계산
  const pendingCount = friends.filter(friend => friend.friend_status === "PENDING" && UserInfo?.userId === friend.receiver_id).length;
  return (
    <div className="flex gap-2 px-4 py-2 bg-white sticky top-0 z-50 justify-end">
      <NavTab
        label="사람 검색"
        icon={<SearchIcon className="w-4 h-4" />}
        selected={selectedTab === "search"}
        onClick={() => setSelectedTab("search")}
      />
      <NavTab
        label="내 친구"
        selected={selectedTab === "friend"}
        onClick={() => setSelectedTab("friend")}
      />
      <NavTab
        label="친구 요청"
        icon={<BellIcon className="w-4 h-4" />}
        badgeCount={pendingCount}          //내 userid에게 친구요청 보낸 사람 수
        selected={selectedTab === "request"}
        onClick={() => setSelectedTab("request")}
      />
    </div>
  );
};