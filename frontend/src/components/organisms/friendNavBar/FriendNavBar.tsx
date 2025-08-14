
import SearchIcon from "../../../asset/search.svg?react";
import BellIcon from "../../../asset/bell.svg?react";

import { NavTab } from "../../molecules/friend/NavTab";
import type { Friend } from "../../../api/FriendPageApi";

type TabKey = "search" | "friend" | "request";

type FriendNavBarProps = {
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
  friends: Friend[];
  userId?: number;
};

export const FriendNavBar = ({ selectedTab, setSelectedTab, friends,userId}: FriendNavBarProps) => {

  // "PENDING" 상태인 친구 수 계산
  const pendingCount = friends.filter(friend => friend.friend_status === "PENDING" && userId === friend.receiver_id).length;
  return (
    <div className="flex gap-2 px-4 py-2 sticky top-0 z-50 justify-end">
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