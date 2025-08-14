import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import ropeThumbnail from "./../../../asset/png/pirate_rope_hang.png";
import rainThumbnail from "../../../asset/png/rainThumbnail.png";
import cardThumbnail from "../../../asset/png/cardThumbnail.png";
import treasureChest from "../../../asset/png/treasureChest.png";
import gameMap from "../../../asset/png/gameMap.png";

type GameSelectTemplateProps = {
  onClick: (v: number) => void;
};
type GameSelect = {
  gameNumber: number;
  gameTitle: string;
  gameDescription: string;
  gameThumbnail: string;
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
      gameTitle: "행맨",
      gameDescription: "한 글자씩 단어를 맞추어 보아요.",
      gameThumbnail: ropeThumbnail,
    },
    {
      gameNumber: 2,
      gameTitle: "소나기",
      gameDescription: "폭탄이 도착하기 전에 막아주세요",
      gameThumbnail: rainThumbnail,
    },
    {
      gameNumber: 3,
      gameTitle: "카드 뒤집기",
      gameDescription: "뒤집어 있는 카드의 짝을 맞춰요.",
      gameThumbnail: cardThumbnail,
    },
  ];
  return (
    <Div
      align={"center"}
      className="grow p-2 pt-20 bg-center bg-cover"
      style={{ backgroundImage: `url(${gameMap})` }}
    >
      <ImageBox
        src={games[ready - 1].gameThumbnail}
        className="grow rounded-2xl border-2 w-full max-w-xl border-orange-800 bg-white/80"
      />
      <Div align={"center"} className="w-full gap-2">
        {/* 선택 부분 */}
        <Div className="w-[60%] flex flex-row justify-around">
          {games.map(g => (
            <Div align={"center"} className="w-[16%] relative">
              <ImageBox
                src={treasureChest}
                defaultBg="bg-transparent"
                className="absolute left-1/2 -translate-x-1/2 z-0 w-full"
              ></ImageBox>
              <Button
                className="grow z-10"
                onClick={() => moveFunction(g.gameNumber)}
              >
                <Text
                  font={"outline"}
                  color="white"
                  className="p-10 whitespace-nowrap"
                  size={"xxxl"}
                >
                  {g.gameTitle}
                </Text>
              </Button>
            </Div>
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
    </Div>
  );
};
