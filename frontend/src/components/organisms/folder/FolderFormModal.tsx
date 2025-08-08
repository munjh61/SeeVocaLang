import { Modal } from "../../atoms/modal/modal";
import { Button } from "../../atoms/button/Button";
import { Input } from "../../atoms/input/Input";
import { Text } from "../../atoms/text/Text";
import { useState } from "react";

type FolderFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folderId: number | null;
  formType: "create" | "update" | null;
  title: string;
  subtitle: string;
  onChangeTitle: (v: string) => void;
  onChangeSubtitle: (v: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
};

export const FolderFormModal = ({
  isOpen,
  onClose,
  folderId,
  formType,
  title,
  subtitle,
  onChangeTitle,
  onChangeSubtitle,
  onDelete,
  onSubmit,
}: FolderFormModalProps) => {
  const [check, setCheck] = useState(true);

  const handleSubmit = () => {
    if (!title && !subtitle) {
      setCheck(false);
      return;
    }
    setCheck(true);
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">
          {formType === "create" ? "단어장 생성" : "단어장 수정"}
        </h1>

        <div>
          <h2>단어장 이름</h2>
          <Input
            value={title}
            onChange={e => onChangeTitle(e.target.value)}
            placeholder="단어장 이름을 입력하세요"
            border={"lightgray"}
          />
        </div>

        <div>
          <h2>단어장 설명</h2>
          <Input
            value={subtitle}
            onChange={e => onChangeSubtitle(e.target.value)}
            placeholder="단어장 설명을 입력하세요"
            border={"lightgray"}
          />
        </div>

        <div className="flex flex-row justify-between gap-4">
          {folderId && (
            <Button
              bgColor={"red"}
              textColor={"white"}
              className="p-1 grow"
              onClick={onDelete}
            >
              삭제하기
            </Button>
          )}
          <Button
            bgColor={"blue"}
            textColor={"white"}
            className="p-1 grow"
            onClick={handleSubmit}
          >
            저장하기
          </Button>
        </div>

        {!check && (
          <Text color="red">단어장 이름, 단어장 설명을 모두 입력해주세요</Text>
        )}
      </div>
    </Modal>
  );
};
