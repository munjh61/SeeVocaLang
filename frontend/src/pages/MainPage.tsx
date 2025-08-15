import { Navigation } from "../components/organisms/nav/Navigation";
import { MainDashboardTemplate } from "../components/templates/MainDashboardTemplate";
import BackgroundLayer from "../components/organisms/onboarding/BackgroundLayer";
import BackgroundImg from "../asset/png/background/background_summer.jpg";

function MainPage() {
  const NAV_H = 80;

  return (
    <BackgroundLayer src={BackgroundImg}>
      <div className="relative h-screen w-full">
        <main
          className="h-full overflow-hidden px-4 pt-6"
          style={{ paddingBottom: `${NAV_H}px` }}
        >
          <MainDashboardTemplate />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-20">
          <Navigation loc="home" />
        </div>
      </div>
    </BackgroundLayer>
  );
}

export default MainPage;
