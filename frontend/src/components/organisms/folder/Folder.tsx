import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { Icon } from "../../atoms/icon/Icon";
import gear from "../../../asset/gear.svg?react";
import folder from "../../../asset/nav_folder.svg?react";
import starF from "../../../asset/star-fill.svg?react";
import starE from "../../../asset/star_empty.svg?react";
import noImage from "../../../asset/png/pirate_shrug.png";
import paper from "../../../asset/png/paper-col.png";
import { useState } from "react";

export type FolderProps = {
  folderId: number;
  thumbnailUrl?: string | null;
  name: string;
  description: string;
  favorite: boolean;
  onEditClick?: (id: number) => void;
  onToggleFavorite?: (id: number, favorite: boolean) => void;
};

export const Folder = ({
  folderId,
  thumbnailUrl,
  name,
  description,
  favorite,
  onEditClick,
  onToggleFavorite,
}: FolderProps) => {
  const [isFav, setIsFav] = useState(favorite);
  return (
    <div
      className="w-full inline-flex flex-col gap-2 select-none bg-contain bg-no-repeat bg-center"
      onDragStart={e => e.preventDefault()}
    >
      <div
        className="relative p-6 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${paper})` }}
      >
        <div className="relative grow p-6">
          <Icon
            icon={isFav ? starF : starE}
            color={"yellow"}
            className="absolute top-0 right-0 cursor-pointer"
            onClick={async () => {
              console.log("현재 즐겨찾기", isFav);
              await onToggleFavorite?.(folderId, isFav);
              setIsFav(prev => !prev);
            }}
          />
          <ImageBox
            src={thumbnailUrl ? thumbnailUrl : noImage}
            className="grow"
            defaultBg="bg-transparent"
          />
        </div>

        <div className="flex flex-col">
          <div className="pl-5">
            <Text
              size={"xxl"}
              weight={"bold"}
              onlyOneLine={"yes"}
              className="mb-3"
              font={"hakgyo"}
            >
              {name}
            </Text>
            <Text
              size={"xl"}
              color={"gray"}
              onlyOneLine={"yes"}
              className="mb-5"
              font={"hakgyo"}
            >
              {description}
            </Text>
          </div>
          <div className="flex flex-row justify-evenly">
            <IconButton
              IconVariant={{ icon: folder, color: "white" }}
              ButtonVariant={{ bgColor: "blue", textColor: "white" }}
              path={`/folder/${folderId}`}
              state={{ name, description }}
            >
              학습하기
            </IconButton>
            <IconButton
              IconVariant={{ icon: gear }}
              ButtonVariant={{ bgColor: "white", border: "gray" }}
              data={folderId}
              buttonValue={v => onEditClick?.(Number(v))}
            >
              수정
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
