import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import dummy from "../../../asset/png/dummyPic.png";
import rainGameThumbnail from "../../../asset/png/rainGameThumbnail.png";

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
      gameThumbnail: dummy,
    },
    {
      gameNumber: 2,
      gameTitle: "소나기",
      gameDescription: "폭탄이 도착하기 전에 막아주세요",
      gameThumbnail: rainGameThumbnail,
    },
    {
      gameNumber: 3,
      gameTitle: "카드 뒤집기",
      gameDescription: "뒤집어 있는 카드의 짝을 맞춰요.",
      gameThumbnail: dummy,
    },
  ];
  return (
    <Div align={"center"} className="grow p-2">
      <ImageBox
        src={games[ready - 1].gameThumbnail}
        className="grow rounded-2xl"
      />
      <Div align={"center"} className="w-full gap-2">
        {/* 선택 부분 */}
        <Div className="flex flex-row w-full gap-4">
          {games.map(g => (
            <Button
              bgColor={"blue"}
              className="w-full"
              onClick={() => moveFunction(g.gameNumber)}
            >
              <Text
                font={"outline"}
                color="white"
                className="p-10"
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
          className="w-full p-4 justify-center"
          rounded={"lg"}
        >
          <Text color="white" font={"outline"} size={"xxxl"} className="w-full">
            {games[ready - 1].gameDescription}
          </Text>
        </Div>
      </Div>
    </Div>
  );
};
