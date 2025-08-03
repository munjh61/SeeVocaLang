import { Input } from "../../atoms/input/Input";

type VocaBookFormProps = {
  formType: "create" | "update";
  title: string;
  subtitle: string;
  onChangeTitle: (v: string) => void;
  onChangeSubtitle: (v: string) => void;
  onSubmit: () => void;
};

export const VocaForm = ({
  formType,
  title,
  subtitle,
  onChangeTitle,
  onChangeSubtitle,
  onSubmit,
}: VocaBookFormProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">
        {formType === "create" ? "단어장 생성" : "단어장 수정"}
      </h1>
      <div>
        <h2>단어장 제목</h2>
        <Input value={title} onChange={e => onChangeTitle(e.target.value)} />
      </div>
      <div>
        <h2>단어장 설명</h2>
        <Input
          value={subtitle}
          onChange={e => onChangeSubtitle(e.target.value)}
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={onSubmit}
      >
        저장하기
      </button>
    </div>
  );
};
