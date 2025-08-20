import type { Friend } from "../../../api/FriendPageApi";
import { Text } from "../../atoms/text/Text";
import { FriendSearchBar } from "../../molecules/friendSearchBar/FriendSearchBar";
import { FriendNavBar } from "../friendNavBar/FriendNavBar";
import penguinImg from "../../../asset/png/pirate_friends.png"
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
   <div className="space-y-4 mt-8 md:mt-24">
  <div className="flex items-center justify-center space-x-4">
  <img
    src={penguinImg}
    alt="friend icon"
    className="w-1/4 max-w-[160px] h-auto"
  />
  <Text
    size="xxxl"
    font={"outline"}
    weight="bold"
    color="black"
    align="left"
    className="whitespace-nowrap overflow-hidden text-ellipsis"
  >
    친구를 찾고 함께 영단어를 학습해보세요!
  </Text>
</div>
<div className="mt-4">  
  <FriendNavBar
    selectedTab={selectedTab}
    setSelectedTab={setSelectedTab}
    friends={friends}
    userId={userId}
  />
</div>

<div className="mt-4"> 
  <FriendSearchBar value={searchValue} onChange={onSearchChange} />
</div>

</div>
  );
};
