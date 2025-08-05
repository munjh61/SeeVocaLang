import noImage from "../../../asset/png/noimage.png";
import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import speaker from "../../../asset/speaker.svg?react";
import { VocaLoc } from "./VocaLoc";
import trash from "../../../asset/delete.svg?react";

export type VocaCardProps = {
  wordId?: number;
  imgUrl?: string;
  audioUrl?: string;
  nameEn: string;
  nameKo: string;
  onDelete?: () => void;
  blurKo?: boolean;
  blurEn?: boolean;
  books?: { id: number; name: string }[];
};

export const VocaCard = ({
  // wordId,
  imgUrl,
  // audioUrl,
  nameEn,
  nameKo,
  blurKo,
  blurEn,
  books,
  onDelete,
}: VocaCardProps) => {
  return (
    <div className="rounded-md shadow-md w-80 p-3 inline-flex flex-col gap-2 bg-white select-none">
      <Text
        size={"xxxl"}
        font={"outline"}
        className="text-green-700 border border-green-400"
        onlyOneLine={"yes"}
        align={"center"}
      >
        {blurEn ? "□".repeat(nameEn.length) : nameEn}
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
          {books && (
            <>
              {books[0] && (
                <VocaLoc
                  bg={"red"}
                  folderId={books[0].id}
                  foldername={books[0].name}
                />
              )}
              {books[1] && (
                <VocaLoc
                  bg={"yellow"}
                  folderId={books[1].id}
                  foldername={books[1].name}
                />
              )}
              {books[2] && (
                <VocaLoc
                  bg={"green"}
                  folderId={books[2].id}
                  foldername={books[2].name}
                />
              )}
              {books.length > 3 && <VocaLoc bg={"blue"}>더보기</VocaLoc>}
            </>
          )}
        </div>
        <ImageBox src={imgUrl ? imgUrl : noImage} className="h-60" />
      </div>
      <Text
        size={"xxxl"}
        font={"outline"}
        color="gray"
        onlyOneLine={"yes"}
        align={"center"}
      >
        {blurKo ? "□".repeat(nameKo.length) : nameKo}
      </Text>
      <div className="flex flex-row flex-wrap justify-center">
        <IconButton
          IconVariant={{ icon: speaker, color: "white" }}
          ButtonVariant={{
            textColor: "white",
            bgColor: "green",
            className: "font-medium",
          }}
          className="w-full"
        >
          발음 듣기
        </IconButton>
      </div>
    </div>
  );
};
