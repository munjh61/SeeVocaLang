import { Text } from "../../atoms/text/Text";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { Icon } from "../../atoms/icon/Icon";
import gear from "../../../asset/gear.svg?react";
import folder from "../../../asset/nav_folder.svg?react";
import starF from "../../../asset/star-fill.svg?react";
import starE from "../../../asset/star_empty.svg?react";
import noImage from "../../../asset/png/noimage.png";

export type FolderProps = {
  folderId: number;
  thumbnailUrl?: string | null;
  name: string;
  description: string;
  favorite: boolean;
  onLearnClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
};

export const Folder = ({
  folderId,
  thumbnailUrl,
  name,
  description,
  favorite,
  onLearnClick,
  onEditClick,
  onToggleFavorite,
}: FolderProps) => {
  // console.log(folderId, thumbnailUrl, name, description, favorite);
  return (
    <div
      className="rounded-md shadow-md w-full p-3 inline-flex flex-col gap-2 bg-white select-none"
      onDragStart={e => e.preventDefault()}
    >
      <div className="relative grow">
        <Icon
          icon={favorite ? starF : starE}
          color={"yellow"}
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => onToggleFavorite?.(folderId)}
        />
        <ImageBox
          src={thumbnailUrl ? thumbnailUrl : noImage}
          className="grow"
        />
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
          <Text size={"xs"} color={"blue"} onlyOneLine={"yes"} className="mb-5">
            {description}
          </Text>
        </div>
        <div className="flex flex-row justify-evenly">
          <IconButton
            IconVariant={{ icon: folder, color: "white" }}
            ButtonVariant={{ bgColor: "blue", textColor: "white" }}
            buttonValue={v => onLearnClick?.(Number(v))}
            path={`/folder/${folderId}`}
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
  );
};
