import { Navigation } from "../components/organisms/nav/Navigation";

function FriendPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <h1>친구 페이지 하이</h1>
      </div>
      <Navigation loc="friend" />
    </div>
  );
}

export default FriendPage;
