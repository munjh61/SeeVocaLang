import { Navigation } from "../components/organisms/nav/Navigation.tsx";

function GamePage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto"></div>
      <Navigation loc={"game"} />
    </div>
  );
}

export default GamePage;
