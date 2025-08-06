// import { useState } from "react";
// import { FriendHeader } from "../components/organisms/friendHeader/FriendHeader";
// import { FriendSearchContent } from "../components/templates/friendContents/FriendSearchContent";
// import { MyFriendsContent } from "../components/templates/friendContents/MyFriendsContent";
// import { FriendRequestContent } from "../components/templates/friendContents/FriendRequestContent";

import MyPage from "./MyPage";

// type TabKey = "search" | "friend" | "request";
// function TestPageKwon() {
// const [searchValue, setSearchValue] = useState("");
// const [selectedTab, setSelectedTab] = useState<TabKey>("search")
//   return(
 
//      <div className="p-4">
//       <FriendHeader
//         searchValue={searchValue}
//         onSearchChange={(e) => setSearchValue(e.target.value)}
//         selectedTab={selectedTab}
//         setSelectedTab={setSelectedTab}
//       />

//       { <div className="mt-4">
//         {/* {selectedTab === "search" && <FriendSearchContent searchValue={searchValue} />} */}
//         {selectedTab === "friend" && <MyFriendsContent />}
//         {selectedTab === "request" && <FriendRequestContent />}
//       </div> }
//     </div>
     

    

//   );
// }
// export default TestPageKwon;

function TestPageKwon() {

  return(
    <MyPage/>
  );
}
export default TestPageKwon;