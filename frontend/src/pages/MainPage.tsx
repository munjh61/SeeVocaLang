import { Navigation } from "../components/organisms/nav/Navigation";
import { MainDashboardTemplate } from "../components/templates/MainDashboardTemplate.tsx";

function MainPage() {
  return (
    <div className="flex flex-col h-screen">
      <MainDashboardTemplate />
      <Navigation loc="home" />
    </div>
  );
}
export default MainPage;
