import { useState } from "react";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";
import ropeThumbnail from "./../../../asset/png/capture.png";
import rainThumbnail from "../../../asset/png/rainThumbnail.png";
import cardThumbnail from "../../../asset/png/cardThumbnail.png";
import gamebackground from "../../../asset/png/gameBackground.png";
import bg from "../../../asset/png/background/roundedpaper.png";
import { GameSelectButton } from "../../molecules/game/GameSelectButton";

type GameSelectTemplateProps = {
  onClick: (v: number) => void;
};
type GameSelect = {
  gameNumber: number;
  gameTitle: string;
  gameDescription: string;
  gameThumbnail: string;
  isFinished: boolean;
};

export const GameSelectTemplate = ({ onClick }: GameSelectTemplateProps) => {
  const [ready, setReady] = useState(1);
  const moveFunction = (gameNumber: number) => {
    if (ready === gameNumber) {
      onClick(gameNumber);
    } else {
      setReady(gameNumber);
    }
  };
  const games: GameSelect[] = [
    {
      gameNumber: 1,
      gameTitle: "포로 탈출",
      gameDescription: "한 글자씩 단어를 맞혀 보아요.",
      gameThumbnail: ropeThumbnail,
      isFinished: true,
    },
    {
      gameNumber: 2,
      gameTitle: "폭탄 피하기",
      gameDescription: "폭탄이 도착하기 전에 막아주세요",
      gameThumbnail: rainThumbnail,
      isFinished: true,
    },
    {
      gameNumber: 3,
      gameTitle: "카드 뒤집기",
      gameDescription: "뒤집어 있는 카드의 짝을 맞춰요.",
      gameThumbnail: cardThumbnail,
      isFinished: false,
    },
  ];
  return (
    <Div
      align={"center"}
      className="w-full p-2 pt-20 bg-center bg-cover gap-8"
      style={{ backgroundImage: `url(${gamebackground})` }}
    >
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="w-[40%] h-[40%] max-w-xl aspect-[4/3] rounded-2xl border-2 border-orange-800 bg-no-repeat bg-cover bg-center"
      >
        <img src={games[ready - 1].gameThumbnail} className="w-full h-full" />
      </div>
      {/* 선택 부분 */}
      <Div className="w-full max-w-6xl grid grid-cols-3 gap-6 place-items-center">
        {games.map(g => (
          <GameSelectButton
            key={g.gameNumber}
            gameNumber={g.gameNumber}
            title={g.gameTitle}
            isFinished={g.isFinished}
            onClick={moveFunction}
          />
        ))}
      </Div>
      {/* 설명 부분 */}
      <Div
        bg={"yellow"}
        align={"center"}
        className="w-fit p-4 justify-center"
        rounded={"lg"}
      >
        <Text
          color="white"
          font={"outline"}
          size={"xxxl"}
          className="w-full text-center"
        >
          {games[ready - 1].gameDescription}
        </Text>
      </Div>
    </Div>
  );
};
