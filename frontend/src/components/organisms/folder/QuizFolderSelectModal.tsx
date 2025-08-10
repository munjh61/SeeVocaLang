import { useNavigate } from "react-router-dom";
import type { FolderProps } from "./Folder";
import { Modal } from "../../atoms/modal/modal";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { Text } from "../../atoms/text/Text";
import { Div } from "../../atoms/div/Div";

type QuizSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vocaList: FolderProps[];
};

export const QuizFolderSelectModal = ({
  isOpen,
  onClose,
  vocaList,
}: QuizSelectModalProps) => {
  const nav = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Text>퀴즈를 풀 단어장을 선택하세요</Text>
        <Div align={"center"}>
          {vocaList.map(folder => (
            <IconButton
              key={folder.folderId}
              ButtonVariant={{
                bgColor: "blue",
                textColor: "white",
              }}
              buttonValue={() => {
                onClose(); // 모달 닫기
                nav(`/quiz/${folder.folderId}`, {
                  state: {
                    name: folder.name,
                    description: folder.description,
                  },
                }); // 페이지 이동
              }}
              className="w-full"
            >
              {folder.name}
            </IconButton>
          ))}
        </Div>
      </div>
    </Modal>
  );
};
