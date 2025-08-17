import { IconButton } from "../../molecules/iconButton/IconButton";
import favorite from "../../../asset/star-fill.svg?react";
import folder from "../../../asset/folder_add.svg?react";
import all from "../../../asset/all.svg?react";
import list from "../../../asset/list.svg?react";

type FolderSecondHeaderProps = {
  isToggle: boolean;
  onClickFavorite: () => void;
  onClickToggle: () => void;
  onClickCreate: () => void;
};

export const VocafolderSecondHeader = ({
  isToggle,
  onClickFavorite,
  onClickToggle,
  onClickCreate,
}: FolderSecondHeaderProps) => {
  return (
    <div className="flex align-center gap-4">
      <IconButton
        IconVariant={{ icon: favorite, color: "white", size: "md" }}
        ButtonVariant={{
          bgColor: "yellow",
          textColor: "white",
          size: "md",
          font: "hakgyo",
        }}
        className="min-w-25"
        buttonValue={onClickFavorite}
      >
        즐겨찾기
      </IconButton>
      <IconButton
        IconVariant={{
          icon: isToggle ? all : list,
          size: "md",
          color: "white",
        }}
        ButtonVariant={{
          bgColor: isToggle ? "green" : "orange",
          textColor: "white",
          size: "md",
          font: "hakgyo",
        }}
        buttonValue={onClickToggle}
        className="min-w-25"
      >
        {isToggle ? "단어장" : "ALL"}
      </IconButton>
      <IconButton
        IconVariant={{ icon: folder, size: "md", color: "white" }}
        ButtonVariant={{
          bgColor: "blue",
          textColor: "white",
          size: "md",
          font: "hakgyo",
        }}
        buttonValue={onClickCreate}
        className="min-w-25"
      >
        단어장 추가하기
      </IconButton>
    </div>
  );
};
