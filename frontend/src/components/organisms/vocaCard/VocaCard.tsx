import noImage from "../../../asset/png/noimage.png";
import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import speaker from "../../../asset/speaker.svg?react";
import { VocaLoc } from "./VocaLoc";

type VocaCardProps = {
  wordId?: number;
  imgUrl?: string;
  audioUrl?: string;
  nameEn: string;
  nameKo: string;
};

export const VocaCard = ({
  // wordId,
  imgUrl,
  // audioUrl,
  nameEn,
  nameKo,
}: VocaCardProps) => {
  return (
    <div className="rounded-md shadow-md w-80 p-3 inline-flex flex-col gap-2 bg-white select-none">
      <div className="relative border-b border-gray-200">
        <div className="absolute top-0 right-0">
          <VocaLoc bg={"red"}>단어장1</VocaLoc>
          <VocaLoc bg={"yellow"}>단어장2</VocaLoc>
          <VocaLoc bg={"green"}>단어장3단어장3단어장3단어장3</VocaLoc>
          <VocaLoc bg={"blue"}>더보기</VocaLoc>
        </div>
        <ImageBox src={imgUrl ? imgUrl : noImage} className="h-60" />
      </div>
      <div className="flex flex-col text-center">
        <Text color="green" size={"lg"} className="font-semibold">
          {nameEn}
        </Text>
        <Text color="gray">{nameKo}</Text>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        <IconButton
          IconVariant={{ icon: speaker, color: "white" }}
          ButtonVariant={{
            textColor: "white",
            bgColor: "green",
            className: "font-medium",
          }}
        >
          발음 듣기
        </IconButton>
      </div>
    </div>
  );
};
