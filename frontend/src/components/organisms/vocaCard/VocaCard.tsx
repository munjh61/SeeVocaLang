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
      <div className="relative border-b border-gray-200">
        <div className="absolute top-0 left-0">
          <IconButton
            IconVariant={{ icon: trash, color: "red" }}
            buttonValue={onDelete}
            ButtonVariant={{ border: "red" }}
          ></IconButton>
        </div>
        <div className="absolute top-0 right-0">
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
      <div className="flex flex-col text-center">
        <Text color="green" size={"lg"} className="font-semibold">
          {blurEn ? "*".repeat(nameEn.length) : nameEn}
        </Text>
        <Text color="gray">{blurKo ? "*".repeat(nameKo.length) : nameKo}</Text>
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
