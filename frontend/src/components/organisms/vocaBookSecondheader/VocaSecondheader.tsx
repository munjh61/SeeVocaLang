import { IconButton } from "../../molecules/iconButton/IconButton";
import favorite from "../../../asset/star-fill.svg?react";
import book from "../../../asset/book_add.svg?react";
import all from "../../../asset/all.svg?react";
import list from "../../../asset/list.svg?react";

type VocaBookSecondHeaderProps = {
  isToggle: boolean;
  onClickFavorite: () => void;
  onClickToggle: () => void;
  onClickCreate: () => void;
};

export const VocaBookSecondHeader = ({
  isToggle,
  onClickFavorite,
  onClickToggle,
  onClickCreate,
}: VocaBookSecondHeaderProps) => {
  return (
    <div className="flex align-center justify-between">
      <div>
        <IconButton
          IconVariant={{ icon: favorite, color: "white", size: "sm" }}
          ButtonVariant={{ bgColor: "yellow", textColor: "white", size: "sm" }}
          className="min-w-25 h-8"
          buttonValue={onClickFavorite}
        >
          즐겨찾기
        </IconButton>
      </div>
      <div className="flex gap-2">
        <IconButton
          IconVariant={{
            icon: isToggle ? all : list,
            size: "sm",
            color: "white",
          }}
          ButtonVariant={{
            bgColor: isToggle ? "green" : "orange",
            textColor: "white",
            size: "sm",
          }}
          buttonValue={onClickToggle}
          className="min-w-25 h-8"
        >
          {isToggle ? "단어장" : "ALL"}
        </IconButton>
        <IconButton
          IconVariant={{ icon: book, size: "sm", color: "white" }}
          ButtonVariant={{ bgColor: "blue", textColor: "white", size: "sm" }}
          buttonValue={onClickCreate}
          className="min-w-25 h-8"
        >
          단어장 추가하기
        </IconButton>
      </div>
    </div>
  );
};
