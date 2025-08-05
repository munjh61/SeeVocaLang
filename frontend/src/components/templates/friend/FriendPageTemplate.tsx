import { useState } from "react";
import { FriendHeader } from "../../organisms/friendHeader/FriendHeader";
import { MyFriendsContent } from "../friendContents/MyFriendsContent";
import { FriendRequestContent } from "../friendContents/FriendRequestContent";
import { FriendSearchContent } from "../friendContents/FriendSearchContent";


type TabKey = "search" | "friend" | "request";
export const FriendPageTemplate = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedTab, setSelectedTab] = useState<TabKey>("search")
    return(
        <div className="p-4">
           <FriendHeader
             searchValue={searchValue}
             onSearchChange={(e) => setSearchValue(e.target.value)}
             selectedTab={selectedTab}
             setSelectedTab={setSelectedTab}
           />

        <div className="mt-4">
         {selectedTab === "search" && <FriendSearchContent searchValue={searchValue} />}
         {selectedTab === "friend" && <MyFriendsContent />}
         {selectedTab === "request" && <FriendRequestContent />}
       </div> 
     </div>

    );
};