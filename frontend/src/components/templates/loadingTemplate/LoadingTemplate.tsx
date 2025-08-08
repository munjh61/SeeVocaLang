import { useEffect, useState } from "react";
import { RainyBalls } from "../../atoms/deco/RainyBall";
import { Div } from "../../atoms/div/Div";
import { Text } from "../../atoms/text/Text";

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
      style={{
        background:
          "linear-gradient(to bottom right, #d8b4fe, #f9a8d4, #93c5fd)",
      }}
    >
      {/* 배경 데코 요소들 */}
      <RainyBalls />
      <Text size={"xxxl"} font={"outline"}>{`로딩중 ${dot[count]}`}</Text>
    </Div>
  );
};
