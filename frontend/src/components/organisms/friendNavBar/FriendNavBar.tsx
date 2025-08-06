import SearchIcon from "../../../asset/search.svg?react";
import BellIcon from "../../../asset/bell.svg?react";

import { NavTab } from "../../molecules/friend/NavTab";

// ✅ 외부에서 사용할 수 있게 export 추가!
export type TabKey = "search" | "friend" | "request";

type FriendNavBarProps = {
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
};

export const FriendNavBar = ({
  selectedTab,
  setSelectedTab,
}: FriendNavBarProps) => {
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
        badgeCount={3}
        selected={selectedTab === "request"}
        onClick={() => setSelectedTab("request")}
      />
    </div>
  );
};
