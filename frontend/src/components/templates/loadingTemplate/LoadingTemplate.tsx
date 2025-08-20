import { useEffect, useState } from "react";
import { RainyBalls } from "../../atoms/deco/RainyBall";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";
import sea from "../../../asset/png/sea.png";
import penguin from "../../../asset/png/bino_run.png";

export const LoadingPage = () => {
  const [count, setCount] = useState(0);
  const dot = [".", "..", "..."];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval); // 언마운트 시 정리
  }, []);

  return (
    <Div
      align={"center"}
      className="grow w-full h-full relative overflow-hidden justify-center"
      style={{ backgroundImage: `url(${sea})` }}
    >
      {/* 배경 데코 요소들 */}
      <RainyBalls />
      <img src={penguin} />
      <Text size={"xxxl"} font={"outline"}>{`로딩중 ${dot[count]}`}</Text>
    </Div>
  );
};
