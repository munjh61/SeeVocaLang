import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import gear from "../../../asset/gear.svg?react";
import book from "../../../asset/nav_book.svg?react";

type VocaCardProps = {
  thumbnail?: string;
  name: string;
  description: string;
};

export const VocaCard = ({ thumbnail, name, description }: VocaCardProps) => {
  return (
    <div className="rounded-md shadow-md w-60 p-3 inline-flex flex-col gap-2 bg-white">
      <div>
        <ImageBox src={thumbnail} className="w-full h-full"></ImageBox>
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
            ButtonVariant={{ bgColor: "white", border: "purple" }}
          >
            수정
          </IconButton>
        </div>
      </div>
    </div>
  );
};
