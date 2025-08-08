import noImage from "../../../asset/png/noimage.png";
import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { VocaLoc } from "./VocaLoc";
import trash from "../../../asset/delete.svg?react";
import cardDeco from "../../../asset/png/cardDecoration.png";
import { TTSButton } from "../../molecules/ttsButton/TTSButton";

export type VocaCardProps = {
  wordId?: number;
  imgUrl?: string;
  nameEn: string;
  nameKo: string;
  onDelete?: () => void;
  blurKo?: boolean;
  blurEn?: boolean;
  folders?: { id: number; name: string }[];
};

export const VocaCard = ({
  // wordId,
  imgUrl,
  nameEn,
  nameKo,
  blurKo,
  blurEn,
  folders,
  onDelete,
}: VocaCardProps) => {
  const enLength = nameEn.length;
  const koLength = nameKo.length;

  return (
    <div className="rounded-md shadow-md w-full h-full p-3 inline-flex flex-col gap-2 bg-white select-none relative">
      <img
        src={cardDeco}
        className="absolute inset-0 w-full h-full opacity-20 z-0 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col gap-2 h-full p-5">
        <Text
          size={nameEn.length < 12 ? "xxxl" : "xxl"}
          font={"outline"}
          className="text-green-700 flex items-center justify-center h-10"
          onlyOneLine={"yes"}
          align={"center"}
        >
          {blurEn ? "□".repeat(enLength) : nameEn}
        </Text>
        <div className="relative border-b border-gray-200">
          <div className="absolute top-1 left-1">
            <IconButton
              IconVariant={{ icon: trash, color: "white" }}
              buttonValue={onDelete}
              ButtonVariant={{ bgColor: "red" }}
              className="rounded-full h-9"
            ></IconButton>
          </div>
          <div className="absolute top-1 right-1">
            {folders && (
              <>
                {folders[0] && (
                  <VocaLoc
                    bg={"red"}
                    folderId={folders[0].id}
                    foldername={folders[0].name}
                  />
                )}
                {folders[1] && (
                  <VocaLoc
                    bg={"yellow"}
                    folderId={folders[1].id}
                    foldername={folders[1].name}
                  />
                )}
                {folders[2] && (
                  <VocaLoc
                    bg={"green"}
                    folderId={folders[2].id}
                    foldername={folders[2].name}
                  />
                )}
                {folders.length > 3 && <VocaLoc bg={"blue"}>더보기</VocaLoc>}
              </>
            )}
          </div>
          <ImageBox
            src={imgUrl ? imgUrl : noImage}
            className="h-50"
            imgClassName="object-cover"
          />
        </div>
        <Text
          size={"xxxl"}
          font={"outline"}
          color="gray"
          onlyOneLine={"yes"}
          align={"center"}
        >
          {blurKo ? "□".repeat(koLength) : nameKo}
        </Text>
        <div className="flex flex-row flex-wrap justify-center">
          <TTSButton text={nameEn} />
        </div>
      </div>
    </div>
  );
};
