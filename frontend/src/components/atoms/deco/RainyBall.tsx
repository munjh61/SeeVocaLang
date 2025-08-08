import { Div } from "../div/Div";
import { Ball } from "./Ballzz";
import { BallVariants } from "./BallVariants";
import type { VariantProps } from "class-variance-authority";

type BallColor = VariantProps<typeof BallVariants>["color"];

const ballColors: BallColor[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
];

export const RainyBalls = () => {
  return (
    <Div className="w-full overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <Ball
          key={i}
          size={Math.random() * 30 + 10}
          color={ballColors[Math.floor(Math.random() * ballColors.length)]}
          initialLeft={Math.random() * 100}
          delay={Math.random() * 5000}
          duration={2000 + Math.random() * 3000}
        />
      ))}
    </Div>
  );
};
