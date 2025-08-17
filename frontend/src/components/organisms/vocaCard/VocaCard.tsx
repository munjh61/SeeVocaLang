import noImage from "../../../asset/png/pirate_shrug.png";
import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { VocaLoc } from "./VocaLoc";
import trash from "../../../asset/delete.svg?react";
import paper from "../../../asset/png/paper-col.png";
import paper_partial from "../../../asset/png/paper_partial.png";
// import cardDeco from "../../../asset/png/cardDecoration.png";
import { TTSButton } from "../../molecules/ttsButton/TTSButton";
import { Button } from "../../atoms/button/Button";

export type VocaCardProps = {
  wordId?: number;
  imageUrl?: string;
  nameEn: string;
  nameKo: string;
  onDelete?: () => void;
  blurKo?: boolean;
  blurEn?: boolean;
  folders?: { id: number; name: string }[];
};

export const VocaCard = ({
  // wordId,
  imageUrl,
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
    <div className="rounded-md w-full h-full p-5 inline-flex flex-col items-center gap-2 select-none relative">
      <img
        src={paper}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />
      <div className="relative z-10 flex flex-col gap-2 h-full p-5 w-[80%]">
        <Text
          size={nameEn.length < 12 ? "xxxl" : "xxl"}
          font={"hakgyo"}
          className="text-yellow-700 flex items-center justify-center h-10"
          onlyOneLine={"yes"}
          align={"center"}
        >
          {blurEn ? "□".repeat(enLength) : nameEn}
        </Text>
        <IconButton
          IconVariant={{ icon: trash, color: "white" }}
          buttonValue={onDelete}
          ButtonVariant={{ bgColor: "brown" }}
          className="rounded-full h-9 absolute top-1 left-1"
        />
        <div className="relative">
          <div className="absolute top-1 right-1">
            {folders && (
              <>
                {folders[0] && (
                  <VocaLoc
                    bg={"red"}
                    folderId={folders[0].id}
                    name={folders[0].name}
                  />
                )}
                {folders[1] && (
                  <VocaLoc
                    bg={"yellow"}
                    folderId={folders[1].id}
                    name={folders[1].name}
                  />
                )}
                {folders[2] && (
                  <VocaLoc
                    bg={"green"}
                    folderId={folders[2].id}
                    name={folders[2].name}
                  />
                )}
                {folders.length > 3 && (
                  <Button
                    bgColor={"blue"}
                    textColor={"white"}
                    className="p-1 w-18 block"
                  >
                    더보기
                  </Button>
                )}
              </>
            )}
          </div>
          <ImageBox
            src={imageUrl ? imageUrl : noImage}
            className="h-50"
            imgClassName="object-cover"
            defaultBg="bg-transparent"
          />
          <img
            src={paper_partial}
            className="absolute opacity-20 inset-0 w-full h-full z-0 pointer-events-none"
          />
        </div>
        <Text
          size={"xxxl"}
          font={"hakgyo"}
          color="brown"
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
