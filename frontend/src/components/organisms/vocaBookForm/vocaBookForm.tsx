import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { Input } from "../../atoms/input/Input";
import { Text } from "../../atoms/text/Text";

type VocaBookFormProps = {
  bookId: number | null;
  formType: "create" | "update";
  title: string;
  subtitle: string;
  onChangeTitle: (v: string) => void;
  onChangeSubtitle: (v: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
};

export const VocaForm = ({
  bookId,
  formType,
  title,
  subtitle,
  onChangeTitle,
  onChangeSubtitle,
  onDelete,
  onSubmit,
}: VocaBookFormProps) => {
  const [check, setCheck] = useState(true);
  return (
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
        />
      </div>
      <div>
        <h2>단어장 설명</h2>
        <Input
          value={subtitle}
          onChange={e => onChangeSubtitle(e.target.value)}
          placeholder="단어장 설명을 입력하세요"
        />
      </div>
      <div className="flex flex-row justify-between gap-4">
        {bookId && (
          <Button
            bgColor={"red"}
            textColor={"white"}
            className="p-1 flex-grow"
            onClick={onDelete}
          >
            삭제하기
          </Button>
        )}
        <Button
          bgColor={"blue"}
          textColor={"white"}
          className="p-1 flex-grow"
          onClick={() => {
            if (!title && !subtitle) {
              setCheck(false);
              return;
            }
            setCheck(true);
            onSubmit();
          }}
        >
          저장하기
        </Button>
      </div>
      {!check && (
        <Text color="red">단어장 이름, 단어장 설명을 모두 입력해주세요</Text>
      )}
    </div>
  );
};
