// import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";

import { Text } from "../../atoms/text/Text";


export const MyFriendsContent = () => {
//   const friends = DUMMY_FRIENDS.filter(friend => friend.status === "friend");

  return (
   <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">
      <Text color="black" size={"lg"} weight={"bold"}>내 친구목록</Text>
      <Text color="gray" size={"xs"}>6명의 친구</Text>
      {/* {friends.map((friend) => (
        <FriendInfoCard
          key={friend.id}
          name={friend.name}
          profileUrl={friend.profileUrl}
          status={friend.status}
        />
      ))} */}
    </div>
  );
};
