import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

type GameSelectTemplateProps = {
  onClick: (v: number) => void;
};
type GameSelect = {
  gameNumber: number;
  gameTitle: string;
  gameDescription: string;
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
    },
    {
      gameNumber: 2,
      gameTitle: "소나기",
      gameDescription:
        "하늘에서 떨어지는 단어를 땅에 떨어지기 전에 막아보아요.",
    },
    {
      gameNumber: 3,
      gameTitle: "카드 뒤집기",
      gameDescription: "뒤집어 있는 카드의 짝을 맞춰요.",
    },
  ];
  return (
    <Div align={"center"} className="grow">
      <h1>게임을 선택하세요</h1>
      <Div className="flex flex-row w-full grow">
        {/* 선택 부분 */}
        <Div align={"center"}>
          {games.map(g => (
            <Button onClick={() => moveFunction(g.gameNumber)}>
              {g.gameTitle}
            </Button>
          ))}
        </Div>
        {/* 설명 부분 */}
        <Div>
          {games.map(g => (
            <Div>
              <Text>{g.gameDescription}</Text>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
};
