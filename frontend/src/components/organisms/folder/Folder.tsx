import { ImageBox } from "../../molecules/imagebox/Imagebox";
import { Icon } from "../../atoms/icon/Icon";
import starF from "../../../asset/star-fill.svg?react";
import starE from "../../../asset/star_empty.svg?react";
import noImage from "../../../asset/png/pirate_shrug.png";
import balloon from "../../../asset/png/balloon.png";
import { useState } from "react";
import { FolderInfo } from "../../molecules/folder/FolderInfo";
import { FolderButton } from "../../molecules/folder/FolderButton";

export type FolderProps = {
  islandSrc?: string;
  folderId: number;
  thumbnailUrl?: string | null;
  name: string;
  description: string;
  favorite: boolean;
  wordCount: number;
  onEditClick: (id: number) => void;
  onToggleFavorite?: (id: number, favorite: boolean) => void;
};

export const Folder = ({
  islandSrc,
  folderId,
  thumbnailUrl,
  name,
  description,
  favorite,
  wordCount,
  onEditClick,
  onToggleFavorite,
}: FolderProps) => {
  const [isFav, setIsFav] = useState(favorite);
  return (
    <div
      className="w-full inline-flex flex-col gap-2 select-none"
      onDragStart={e => e.preventDefault()}
    >
      {/* 위 */}
      <div
        className="flex justify-center items-center grow relative pb-10 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${balloon})` }}
      >
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
          className="h-[60%] rounded-xl"
          defaultBg="bg-transparent"
        />
      </div>
      {/* 아래 */}
      <div
        className="flex flex-col relative bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${islandSrc})` }}
      >
        {/* 글자 부분 */}
        <FolderInfo name={name} description={description} />
        {/* 버튼 부분 */}
      </div>
      <FolderButton
        folderId={folderId}
        name={name}
        description={description}
        wordCount={wordCount}
        onEditClick={onEditClick}
      />
    </div>
  );
};
