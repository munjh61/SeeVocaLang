import { Dots } from "../../atoms/button/Dots";
import { Override } from "../../atoms/button/Override";
import gear from "../../../asset/gear.svg?react";
import folder from "../../../asset/nav_folder.svg?react";
import { useNavigate } from "react-router-dom";

type FolderButtonProps = {
  folderId: number;
  name: string;
  description: string;
  wordCount: number;
  onEditClick: (folderId: number) => void;
  className?: string;
};

export const FolderButton = ({
  folderId,
  name,
  description,
  wordCount,
  onEditClick,
  className,
}: FolderButtonProps) => {
  const nav = useNavigate();
  const handleLearnClick = () => {
    if (wordCount >= 0)
      nav(`/folder/${folderId}`, { state: { name, description } });
  };
  const handleEditClick = () => {
    onEditClick?.(folderId);
  };
  return (
    <div className={`flex flex-row justify-evenly gap-2 ${className}`}>
      <Dots
        icon={folder}
        color={"white"}
        font={"hakgyo"}
        onClick={handleLearnClick}
      >
        학습하기
      </Dots>
      <Override
        icon={gear}
        color={"white"}
        font={"hakgyo"}
        onClick={handleEditClick}
      >
        수정
      </Override>
    </div>
  );
};
