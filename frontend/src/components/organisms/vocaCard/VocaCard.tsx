import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconbutton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import book from "../../../asset/nav_book.svg?react";

type VocaCardProps = {
  thumbnail?: string;
  name: string;
  description: string;
};

export const VocaCard = ({ thumbnail, name, description }: VocaCardProps) => {
  return (
    <div className="rounded-ms w-40 h-60">
      <div>
        <ImageBox src={thumbnail} className="w-full h-full"></ImageBox>
      </div>
      <div>
        <Text size={"xl"} weight={"bold"}>
          {name}
        </Text>
        <Text color={"primary"}>{description}</Text>
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
