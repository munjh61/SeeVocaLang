import { useState } from "react";
import { FriendSearchBar } from "./components/molecules/friendSearchBar/FriendSearchBar";
import { PageHeader } from "./components/molecules/friend/PageHeader";
import { FriendList } from "./components/organisms/friendNavBar/FriendList";
import { FriendNavBar } from "./components/organisms/friendNavBar/FriendNavBar";

const DUMMY_FRIENDS = [
  { id: 1, name: "박지민", status: "response" },
  { id: 2, name: "정민호", status: "delete" },
  { id: 3, name: "송민재", status: "delete" },
  { id: 4, name: "김서현", status: "delete" },
  { id: 5, name: "이준호", status: "delete" },
  { id: 6, name: "최유진", status: "delete" },
];

export default function FriendPage() {
  const [search, setSearch] = useState("");
  const [friends] = useState(DUMMY_FRIENDS);

  const handleDelete = (id: number) => {
    console.log(`${id} 친구 삭제`)
  };
  const handleAdd = (id: number) => {
  console.log(`${id} 친구 추가`);
};

const handleAccept = (id: number) => {
  console.log(`${id} 친구 수락`);
};

const handleRefuse = (id: number) => {
  console.log(`${id} 친구 거절`);
};
  const filtered = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <PageHeader title="친구 목록" subtitle="친구 요청을 확인하고 관리해보세요" />
      <FriendNavBar />
      <FriendSearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

      <div>
        <h2 className="font-semibold text-base mb-2">내 친구 목록</h2>
        <p className="text-sm text-gray-500 mb-4">{filtered.length}명의 친구</p>
        {/* <FriendList friends={filtered}           
            onAdd={handleAdd}
            onDelete={handleDelete}
            onAccept={handleAccept}
            onRefuse={handleRefuse} /> */}
      </div>
    </div>
  );
}