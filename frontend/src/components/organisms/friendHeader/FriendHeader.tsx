import { Text } from "../../atoms/text/Text";
import { FriendSearchBar } from "../../molecules/friendSearchBar/FriendSearchBar";
import { FriendNavBar } from "../friendNavBar/FriendNavBar";

type TabKey = "search" | "friend" | "request";

type FriendHeaderProps = {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTab: TabKey;
  setSelectedTab: (tab: TabKey) => void;
};

export const FriendHeader = ({
  searchValue,
  onSearchChange,
  selectedTab,
  setSelectedTab,
}: FriendHeaderProps) => {
  return (
    <div className="space-y-4">
      <Text
        size="sm"
        weight="bold"
        color="black"
        align="center"
        className="mt-4"
      >
        친구를 찾고 함께 영어를 학습해보세요!
      </Text>
      <FriendNavBar
        selectedTab={selectedTab}
        setSelectedTab={(tab) => setSelectedTab(tab)}
      />

      <FriendSearchBar value={searchValue} onChange={onSearchChange} />
    </div>
  );
};
