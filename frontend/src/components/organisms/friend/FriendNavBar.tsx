import { useState } from "react";
import SearchIcon from "../../../asset/search.svg?react";
import BellIcon from "../../../asset/bell.svg?react";

import { NavTab } from "../../molecules/friend/NavTab";

type TabKey = "search" | "friend" | "request";

export const FriendNavBar = () => {
  const [selectedTab, setSelectedTab] = useState<TabKey>("friend");

  return (
    <div className="flex gap-2 px-4 py-2 bg-white border-b sticky top-0 z-50">
      <NavTab
        label="사람 검색"
        icon={<SearchIcon className="w-4 h-4" />}
        selected={selectedTab === "search"}
        onClick={() => setSelectedTab("search")}
      />
      <NavTab
        label="내 친구"
        // icon={<UserIcon className="w-4 h-4" />}
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
