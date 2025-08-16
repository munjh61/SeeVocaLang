import { Navigation } from "../components/organisms/nav/Navigation";
import { FriendPageTemplate } from "../components/templates/friend/FriendPageTemplate";
import ocean from "../asset/png/background/background_summer.jpg"
import parchment from "../asset/png/friend.png"


function FriendPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${ocean})` }}
      />

      <div
        className="mx-auto w-[min(1100px,calc(100%-32px))] mt-4 rounded-3xl shadow-xl overflow-hidden"
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

      <div className="fixed inset-x-0 bottom-0 z-50">
        <Navigation loc="friend" />
      </div>
    </div>
  );
}

export default FriendPage;
