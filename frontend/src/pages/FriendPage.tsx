import { Navigation } from "../components/organisms/nav/Navigation";
import { FriendPageTemplate } from "../components/templates/friend/FriendPageTemplate";
import ocean from "../asset/png/background/background_summer.jpg"
import parchment from "../asset/png/friend.png"


function FriendPage() {
  return (
   <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${ocean})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", 
      }}
    >
      {/* 가운데 양피지 컨테이너 */}
      <div
       className="
          mx-auto w-[min(1100px,calc(100%-32px))] mt-4 rounded-3xl shadow-xl
          overflow-hidden             
        "
        style={{
          backgroundImage: `url(${parchment})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% calc(100% - 200px)",
          backgroundPosition: "center 90px",
          minHeight: "80vh",
        }}
        > 
        
        
    <FriendPageTemplate />

      </div>

      {/* 하단 네비 고정 */}
      <div className="fixed inset-x-0 bottom-0 z-50">
        <Navigation loc="friend" />
      </div>
    </div>
  );
}

export default FriendPage;
