import { Text } from "../../atoms/text/Text";
import { Button } from "../../atoms/button/Button";

type Props = {
  file: File;
  result: string[];
  onClose: () => void;
};

export const UploadStep3 = ({ file, result, onClose }: Props) => {
  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        AI 분석 결과
      </Text>

      <div className="flex gap-6">
        <div className="flex-1">
          <Text size="sm" weight="bold" className="mb-1">
            분석된 이미지
          </Text>
          <img
            src={fileUrl}
            alt="result"
            className="rounded-lg border shadow-sm w-full max-w-[240px]"
          />
          <p className="text-xs text-gray-400 mt-1">
            처리 시간: 847ms | 감지된 단어: {result.length}개
          </p>
        </div>

        <div className="flex-1">
          <Text size="sm" weight="bold">
            감지된 단어들
          </Text>
          <ul className="mt-2 text-sm text-gray-700">
            {result.length > 0 ? (
              result.map((word, idx) => <li key={idx}>• {word}</li>)
            ) : (
              <p className="text-muted">감지된 단어가 없습니다.</p>
            )}
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button size="md" bgColor="gradientGreen" onClick={onClose}>
          단어 저장하기
        </Button>
      </div>
    </div>
  );
};
