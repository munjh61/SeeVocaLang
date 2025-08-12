import { useState } from "react";
import { Navigation } from "../components/organisms/nav/Navigation.tsx";
import { GameSelectTemplate } from "../components/templates/game/GameSelectTemplate.tsx";
import { HangmanTemplate } from "../components/templates/game/HangmanTemplate.tsx";

function GamePage() {
  const [game, setGame] = useState(0);
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        {game == 0 && <GameSelectTemplate onClick={v => setGame(v)} />}
        {game == 1 && <HangmanTemplate />}
      </div>
      <Navigation loc={"game"} />
    </div>
  );
}

export default GamePage;
