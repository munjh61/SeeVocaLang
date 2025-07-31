import { AddFriendButton } from "../components/molecules/friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../components/molecules/friendButtons/DeleteFriendButton";

function TestPageKwon() {
  return(
    <div className="flex">
    <AddFriendButton data="user123" className="w-full"/>
    <DeleteFriendButton data="user123" className="w-full"/>
    </div>
  );
}
export default TestPageKwon;
