import { Navigation } from "../components/organisms/nav/Navigation";
import { MyPageTemplate } from "../components/templates/myPage/MyPageTemplate";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer.tsx";
import WoodBackgroundImg from "../asset/png/background/wood_background.jpg";
function MyPage() {
  return (
    <div className="flex flex-col h-screen">
      <BackgroundLayer src={WoodBackgroundImg}>
        <MyPageTemplate></MyPageTemplate>
        <div className="fixed inset-x-0 bottom-0 z-20">
          <Navigation loc="mypage" />
        </div>
      </BackgroundLayer>
    </div>
  );
}

export default MyPage;
