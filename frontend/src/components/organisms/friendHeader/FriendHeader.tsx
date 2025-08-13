import type { Friend } from "../../../api/FriendPageApi";
import { Text } from "../../atoms/text/Text";
import { FriendSearchBar } from "../../molecules/friendSearchBar/FriendSearchBar";
import { FriendNavBar } from "../friendNavBar/FriendNavBar";

type TabKey = "search" | "friend" | "request";

type FriendHeaderProps = {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
  friends: Friend[];
  userId?: number;
};

export const FriendHeader = ({ 
  searchValue, 
  onSearchChange,
  selectedTab,
  setSelectedTab, 
  friends,
  userId,
  }: FriendHeaderProps) => {
  return (
    <div className="space-y-4">
      <Text
      size="xl"
      weight="bold"
      color="black"
      align="center"
      className="mt-4"
      >
      친구를 찾고 함께 영어를 학습해보세요!
      </Text>
      <FriendNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} friends={friends}userId={userId} />

      <FriendSearchBar value={searchValue} onChange={onSearchChange} />
    </div>
  );
};
