import { useState } from "react";
import { FriendSearchBar } from "../components/molecules/friendSearchBar/FriendSearchBar";
import { AddFriendButton } from "../components/molecules/friendButtons/AddFriendButton";
import { DeleteFriendButton } from "../components/molecules/friendButtons/DeleteFriendButton";
import { RequestFriendButton } from "../components/molecules/friendButtons/RequestFriendButton";
import { FriendInfoCard } from "../components/molecules/FriendInfoCard/FriendInfoCard";
import { SearchbarSegment } from "../components/organisms/searchbarSegment/SearchbarSegment";
import { FriendNavBar } from "../components/organisms/friend/FriendNavBar";


function TestPageKwon() {
   const [keyword, setKeyword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return(
 
    <div>
      <FriendNavBar/>
      <SearchbarSegment onSearch={v=>console.log(v)}/>
      <AddFriendButton data="user123" className="w-full"/>
      <DeleteFriendButton data="user123" className="w-full"/>
      <RequestFriendButton className="w-full"/>
      <FriendInfoCard name="권주현" status="none"/>
      <FriendSearchBar value={keyword} onChange={handleChange} />
    </div>
    

    

  );
}
export default TestPageKwon;
