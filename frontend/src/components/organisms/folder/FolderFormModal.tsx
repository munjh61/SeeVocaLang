import { Modal } from "../../atoms/modal/modal";
import { Input } from "../../atoms/input/Input";
import { Text } from "../../atoms/text/Text";
import { useState } from "react";
import { Override } from "../../atoms/button/Override";

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
          <Text font={"hakgyo"} size={"xxl"}>
            단어장 이름
          </Text>
          <Input
            value={title}
            onChange={e => onChangeTitle(e.target.value)}
            placeholder="단어장 이름을 입력하세요"
            border={"lightgray"}
          />
        </div>

        <div>
          <Text font={"hakgyo"} size={"xxl"}>
            단어장 설명
          </Text>
          <Input
            value={subtitle}
            onChange={e => onChangeSubtitle(e.target.value)}
            placeholder="단어장 설명을 입력하세요"
            border={"lightgray"}
          />
        </div>

        <div className="flex flex-row justify-between gap-4">
          {folderId && (
            <Override color={"white"} bg={"red"} onClick={onDelete}>
              삭제하기
            </Override>
          )}
          <Override color={"white"} bg={"blue"} onClick={handleSubmit}>
            저장하기
          </Override>
        </div>

        {!check && (
          <Text color="red">단어장 이름, 단어장 설명을 모두 입력해주세요</Text>
        )}
      </div>
    </Modal>
  );
};
