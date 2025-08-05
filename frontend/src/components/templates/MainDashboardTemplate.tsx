import { PhotoUpload } from "../organisms/PhotoUpload.tsx";
import { MainActionPanel } from "../organisms/MainActionPanel .tsx";

export const MainDashboardTemplate = () => {
  return (
    <div className={"flex flex-row h-screen w-full pb-15 px-2 pt-2 gap-2"}>
      <PhotoUpload />
      <MainActionPanel />
    </div>
  );
};
