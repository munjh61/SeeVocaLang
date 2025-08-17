import { Text } from "../../atoms/text/Text";
import open from "../../../asset/png/treasureChest.png";
import closed from "../../../asset/png/treasureChestClosed.png";
import styles from "./GameSelectButton.module.css";

type GameSelectButtonProps = {
  gameNumber: number;
  title: string;
  isFinished: boolean;
  onClick: (gameNumber: number) => void;
};

export const GameSelectButton = ({
  gameNumber,
  title,
  isFinished,
  onClick,
}: GameSelectButtonProps) => {
  const handleClick = () => {
    if (isFinished) onClick(gameNumber);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={title}
      aria-disabled={!isFinished}
      className={[
        "relative w-[24vw] max-w-[330px] min-w-[200px] aspect-[4/3] select-none",
        isFinished ? "cursor-pointer" : "opacity-60 cursor-not-allowed",
        isFinished ? styles.hoverRock : "",
      ].join(" ")}
    >
      {/* 상자 이미지 (흔들 대상) */}
      <img
        src={isFinished ? open : closed}
        alt=""
        className={`absolute inset-0 w-full h-full object-contain ${styles.wiggleTarget}`}
        draggable={false}
      />

      {/* 게임 이름 (고정, 클릭 방해 X) */}
      <Text
        font={"hakgyo"}
        color="white"
        size={"xxxl"}
        className="absolute inset-x-0 bottom-2 text-center whitespace-nowrap pointer-events-none drop-shadow"
      >
        {title}
      </Text>
    </button>
  );
};
