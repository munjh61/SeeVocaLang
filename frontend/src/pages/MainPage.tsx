import { Navigation } from "../components/organisms/nav/Navigation";
import { MainDashboardTemplate } from "../components/templates/MainDashboardTemplate.tsx";

function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <MainDashboardTemplate />
      </div>
      <Navigation loc="home" />
    </div>
  );
}
export default MainPage;
