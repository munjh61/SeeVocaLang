import { Navigation } from "../components/organisms/nav/Navigation";
import { FriendPageTemplate } from "../components/templates/friend/FriendPageTemplate";
import ocean from "../asset/png/background/background_summer.jpg"
import parchment from "../asset/png/friend.png"



function FriendPage() {

  const GAP = "clamp(72px, 12vh, 200px)";

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: `url(${ocean})` }}
      />
      <div
        className="relative mx-auto w-[min(1100px,calc(100%-32px))] mt-4 rounded-3xl shadow-xl overflow-hidden"
      >
        <div
          className="absolute inset-x-0 bottom-0 bg-no-repeat bg-[length:100%_100%] bg-center"
          style={{ top: GAP, backgroundImage: `url(${parchment})` }}
        />
        <div className="relative z-10" style={{ paddingTop: GAP, paddingBottom: "96px" }}>
          <FriendPageTemplate />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50">
        <Navigation loc="friend" />
      </div>
    </div>
  );
}

export default FriendPage;
