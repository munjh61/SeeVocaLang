import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { Icon } from "../../atoms/icon/Icon";
import gear from "../../../asset/gear.svg?react";
import book from "../../../asset/nav_book.svg?react";
import starF from "../../../asset/star-fill.svg?react";
import starE from "../../../asset/star_empty.svg?react";
import { useState } from "react";

type VocaCardProps = {
  thumbnail?: string;
  name: string;
  description: string;
  favorite: boolean;
};

export const VocaCard = ({
  thumbnail,
  name,
  description,
  favorite,
}: VocaCardProps) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  return (
    <div
      className="rounded-md shadow-md w-60 p-3 inline-flex flex-col gap-2 bg-white select-none"
      onDragStart={e => e.preventDefault()}
    >
      <div className="relative">
        <Icon
          icon={isFavorite ? starF : starE}
          className="absolute top-0 right-0"
          onClick={toggleFavorite}
        />
        <ImageBox src={thumbnail} className="w-full h-full" />
      </div>

      <div className="flex flex-col">
        <div className="pl-5">
          <Text
            size={"xl"}
            weight={"bold"}
            onlyOneLine={"yes"}
            className="mb-3"
          >
            {name}
          </Text>
          <Text
            size={"xs"}
            color={"primary"}
            onlyOneLine={"yes"}
            className="mb-5"
          >
            {description}
          </Text>
        </div>
        <div className="flex flex-row justify-evenly">
          <IconButton
            IconVariant={{ icon: book, color: "white" }}
            ButtonVariant={{ bgColor: "blue", textColor: "white" }}
          >
            학습하기
          </IconButton>
          <IconButton
            IconVariant={{ icon: gear }}
            ButtonVariant={{ bgColor: "white", border: "gray" }}
          >
            수정
          </IconButton>
        </div>
      </div>
    </div>
  );
};
