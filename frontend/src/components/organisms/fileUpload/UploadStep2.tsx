import { Text } from "../../atoms/text/Text";
import { Button } from "../../atoms/button/Button";

type Props = {
  file: File;
  onBack: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean; // ⬅️ 추가
};

export const UploadStep2 = ({
  file,
  onBack,
  onAnalyze,
  isAnalyzing,
}: Props) => {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        업로드 정보 확인
      </Text>

      <div className="flex gap-6">
        <div className="flex-1">
          <Text size="sm" weight="bold" className="mb-1">
            미리보기
          </Text>
          <img
            src={fileUrl}
            alt="preview"
            className="rounded-lg shadow-lg w-full max-w-[240px]"
          />
        </div>

        <div className="flex-1 text-sm text-gray-600">
          <Text weight="bold">파일 정보</Text>
          <p>이름: {file.name}</p>
          <p>크기: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>형식: {file.type}</p>
          <p>업로드 시간: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          size="md"
          bgColor="gray"
          onClick={onBack}
          disabled={isAnalyzing}
        >
          다시 선택
        </Button>
        <Button
          size="md"
          bgColor="gradientPurple"
          onClick={onAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "분석 중..." : "업로드 분석 시작"}
        </Button>
      </div>
    </div>
  );
};
