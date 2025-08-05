import { useNavigate } from "react-router-dom";
import type { VocaBookProps } from "./VocaBook";
import { Modal } from "../../atoms/modal/modal";
import { IconButton } from "../../molecules/iconButton/IconButton";
import { Text } from "../../atoms/text/Text";

type QuizBookSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vocaList: VocaBookProps[];
};

export const QuizBookSelectModal = ({
  isOpen,
  onClose,
  vocaList,
}: QuizBookSelectModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Text>퀴즈를 풀 단어장을 선택하세요</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {vocaList.map(book => (
            <IconButton
              key={book.id}
              ButtonVariant={{
                bgColor: "blue",
                textColor: "white",
              }}
              buttonValue={() => {
                onClose(); // 모달 닫기
                navigate(`/quiz?bookId=${book.id}`); // 페이지 이동
              }}
              className="w-full"
            >
              {book.name}
            </IconButton>
          ))}
        </div>
      </div>
    </Modal>
  );
};
