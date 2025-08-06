//import { FriendInfoCard } from "../../molecules/FriendInfoCard/FriendInfoCard";

import { Text } from "../../atoms/text/Text";
export const FriendRequestContent = () => {
//   const requests = DUMMY_FRIENDS.filter(friend => 
//     friend.status === "response" || friend.status === "requested"
//   );

  return (
    <div className="flex flex-col px-4 py-2 bg-gradient-to-b from-[#F7F5FE] to-[#F3FAF3] h-[calc(100vh-160px)] overflow-y-auto">

      {/* {requests.map((friend) => (
        <FriendInfoCard
          key={friend.id}
          name={friend.name}
          profileUrl={friend.profileUrl}
          status={friend.status}
        />
      ))} */}
      <Text color="black" size={"lg"} weight={"bold"}>친구요청</Text>
      <Text color="gray" size={"xs"}>3개의 요청</Text>
    </div>
  );
};
