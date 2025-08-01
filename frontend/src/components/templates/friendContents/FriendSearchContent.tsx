// import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";

import { Text } from "../../atoms/text/Text";


export const FriendSearchContent = () => {
  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
  
      {/* {DUMMY_FRIENDS.map((friend) => (
        <FriendInfoCard
          key={friend.id}
          name={friend.name}
          profileUrl={friend.profileUrl}
          status={friend.status}
        />
      ))} */}
      <Text/>
    </div>
  );
};
