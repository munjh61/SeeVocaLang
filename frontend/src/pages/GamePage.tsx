import { Navigation } from "../components/organisms/nav/Navigation.tsx";

function GamePage() {
  return (
    <div className={"flex flex-col h-screen bg-[#F3FAF3]"}>
      <Navigation loc={"game"} />
    </div>
  );
}

export default GamePage;
