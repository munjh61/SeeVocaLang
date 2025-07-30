
import { useState } from "react";
import { FriendInfoCard } from "./components/molecules/friend/FriendInfoCard";
import { FriendSearchBar } from "./components/molecules/friend/FriendSearchBar";
import { NavTab } from "./components/molecules/friend/NavTab";
import { FriendNavBar } from "./components/organisms/friend/FriendNavBar";
import FriendPage from "./FriendPage";
import { PageHeader } from "./components/molecules/friend/PageHeader";

function App() {
 const [search, setSearch] = useState("");

  return (
    <div>
    <FriendNavBar></FriendNavBar>
    <FriendSearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
    <PageHeader title="새로운 친구 찾기" subtitle="새로운 학습 파트너를 찾아보세요"></PageHeader>
    <FriendInfoCard name="문준호" status="none"></FriendInfoCard>
    </div>
  );

}

export default App;
