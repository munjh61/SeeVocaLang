import { RainyBalls } from "../../atoms/deco/RainyBall";
import { Div } from "../../atoms/div/Div";

export const LoadingPage = () => {
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
      <Div>로딩 중</Div>
    </Div>
  );
};
