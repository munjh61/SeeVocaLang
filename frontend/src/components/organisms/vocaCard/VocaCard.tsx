import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import book from "../../../asset/nav_book.svg?react";

type VocaCardProps = {
  thumbnail?: string;
  name: string;
  description: string;
};

export const VocaCard = ({ thumbnail, name, description }: VocaCardProps) => {
  return (
    <div className="rounded-md shadow-md w-40 h-70 p-3">
      <div>
        <ImageBox src={thumbnail} className="w-full h-full"></ImageBox>
      </div>
      <div>
        <Text size={"xl"} weight={"bold"}>
          {name.length < 6 ? name : `${name.slice(0, 6)}...`}
        </Text>
        <Text color={"primary"}>
          {description.length < 20
            ? description
            : `${description.slice(0, 19)}...`}
        </Text>
        <IconButton
          IconVariant={{ icon: book, color: "white" }}
          ButtonVariant={{ bgColor: "blue", textColor: "white" }}
        >
          학습하기
        </IconButton>
      </div>
    </div>
  );
};
