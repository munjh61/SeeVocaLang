import { PhotoUpload } from "../components/organisms/PhotoUpload.tsx";
import { MainActionPanel } from "../components/organisms/MainActionPanel .tsx";

function TestPageDoh() {
  return (
    <>
      <div className={"flex"}>
        <PhotoUpload />
        <MainActionPanel />
      </div>
    </>
  );
}
export default TestPageDoh;
