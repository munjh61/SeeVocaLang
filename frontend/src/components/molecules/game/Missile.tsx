import { Div } from "../../atoms/div/Div";
import missile from "../../../asset/png/missile.png";
import { ImageBox } from "../imagebox/Imagebox";

type MissileProps = {
  nameEn: string;
  imageUrl: string | undefined;
  width: number;
  height: number;
};

export const Missile = ({ nameEn, imageUrl, width, height }: MissileProps) => {
  return (
    <Div className="relative" draggable={false}>
      <div style={{ width: width, height: height }}>
        <ImageBox src={missile} defaultBg="bg-transparent" />
      </div>
      <img
        src={imageUrl}
        alt={nameEn}
        style={{ width: width / 3, height: height / 3 }}
        className={`object-cover rounded-md shadow-lg select-none absolute left-1/3 top-24/100`}
        draggable={false}
      />
    </Div>
  );
};
