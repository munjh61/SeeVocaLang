import { FriendInfo } from "./components/molecules/friend/FriendInfo";

function App() {
  return (
   <div className="p-8 bg-gray-50 min-h-screen flex flex-col gap-4">
      <FriendInfo
        name="김영희"
        status="none"
        onAdd={() => alert("친구 요청 보냄")}
      />
      <FriendInfo name="이철수" status="requested" />
      <FriendInfo name="박민수" status="friend" />
      <FriendInfo
        name="정하늘"
        status="delete"
        onDelete={() => alert("친구 삭제")}
      />
    </div>
  );
}

export default App;
