import { FriendInfoCard } from "../../molecules/friend/FriendInfoCard";

type FriendStatus = "none" | "requested" |"delete" | "response";

type Friend = {
  id: string;
  name: string;
  profileUrl?: string;
  status: FriendStatus;
};

type FriendListProps = {
  friends: Friend[];
  onAdd: (id: string) => void;
  onDelete: (id: string) => void;
  onAccept: (id: string) => void;
  onRefuse: (id: string) => void;
};

export const FriendList = ({
  friends,
  onAdd,
  onDelete,
  onAccept,
  onRefuse,
}: FriendListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {friends.map((friend) => (
        <FriendInfoCard
          key={friend.id}
          name={friend.name}
          profileUrl={friend.profileUrl}
          status={friend.status}
          onAdd={() => onAdd(friend.id)}
          onDelete={() => onDelete(friend.id)}
          onAccept={() => onAccept(friend.id)}
          onRefuse={() => onRefuse(friend.id)}
        />
      ))}
    </div>
  );
};
