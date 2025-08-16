import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import ropeThumbnail from "./../../../asset/png/pirate_rope_hang.png";
import rainThumbnail from "../../../asset/png/rainThumbnail.png";
import cardThumbnail from "../../../asset/png/cardThumbnail.png";
import treasureChest from "../../../asset/png/treasureChest.png";
import gamebackground from "../../../asset/png/gameBackground.png";

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
      gameTitle: "포로 탈출",
      gameDescription: "한 글자씩 단어를 맞추어 보아요.",
      gameThumbnail: ropeThumbnail,
    },
    {
      gameNumber: 2,
      gameTitle: "폭탄 피하기",
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
      style={{ backgroundImage: `url(${gamebackground})` }}
    >
      <ImageBox
        src={games[ready - 1].gameThumbnail}
        className="w-[40%] h-[40%] rounded-2xl border-2 max-w-xl border-orange-800 bg-white/80"
      />
      <Div align={"center"} className="w-full gap-2 grow">
        {/* 선택 부분 */}
        <Div className="grow grid grid-cols-3 gap-40">
          {games.map(g => (
            <Button
              className="w-full h-full relative m-auto"
              onClick={() => moveFunction(g.gameNumber)}
            >
              <ImageBox
                src={treasureChest}
                defaultBg="bg-transparent"
                className="grow absolute z-0"
              ></ImageBox>
              <Text
                font={"hakgyo"}
                color="white"
                className="p-10 whitespace-nowrap z-10"
                size={"xxxl"}
              >
                {g.gameTitle}
              </Text>
            </Button>
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
