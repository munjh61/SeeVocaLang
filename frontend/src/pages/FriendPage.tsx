import { Navigation } from "../components/organisms/nav/Navigation";
import {FriendPageTemplate} from "../components/templates/friend/FriendPageTemplate"
function FriendPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <FriendPageTemplate/>
      </div>
      <Navigation loc="friend" />
    </div>
  );
}

export default FriendPage;
