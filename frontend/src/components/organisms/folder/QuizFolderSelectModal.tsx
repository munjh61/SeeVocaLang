import { useNavigate } from "react-router-dom";
import type { FolderProps } from "./Folder";
import { Modal } from "../../atoms/modal/modal";
import { Text } from "../../atoms/text/Text";
import { Div } from "../../atoms/div/Div";
import { Override } from "../../atoms/button/Override";
import folderSvg from "../../../asset/folder.svg?react";

type QuizSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folderList: FolderProps[];
};

export const QuizFolderSelectModal = ({
  isOpen,
  onClose,
  folderList,
}: QuizSelectModalProps) => {
  const nav = useNavigate();
  const handleOnClick = (folder: FolderProps) => {
    onClose();
    nav(`/quiz/${folder.folderId}`, {
      state: {
        name: folder.name,
        description: folder.description,
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Text font={"hakgyo"}>퀴즈를 풀 단어장을 선택하세요</Text>
        <Div align={"center"}>
          {folderList.map(
            folder =>
              folder.wordCount > 0 && (
                <Override
                  icon={folderSvg}
                  font={"hakgyo"}
                  size={"xxl"}
                  color={"white"}
                  onClick={() => {
                    handleOnClick(folder);
                  }}
                >
                  {folder.name}
                </Override>
              )
          )}
        </Div>
      </div>
    </Modal>
  );
};
