import { Div } from "../../atoms/div/Div";
import { ImageBox } from "../imagebox/Imagebox";
import heart from ".././../../asset/png/heart.png";

type hpBarProps = {
  hp: number;
  maxHp: number;
  className?: string;
};

export const HpBar = ({ hp, maxHp, className }: hpBarProps) => {
  const ratio = maxHp > 0 ? Math.min(Math.max(hp / maxHp, 0), 1) : 0;
  const percent = Math.round(ratio * 100);
  return (
    <Div className={`grow flex flex-row gap-4 ${className}`}>
      <ImageBox src={heart} className="w-12 h-12" defaultBg="bg-transparent" />
      <Div className="w-full border border-gray rounded-full overflow-hidden">
        <Div
          style={{ width: `${percent}%` }}
          className={`h-full transition-[width] duration-300 ease-out`}
          bg={"red"}
        />
      </Div>
    </Div>
  );
};
