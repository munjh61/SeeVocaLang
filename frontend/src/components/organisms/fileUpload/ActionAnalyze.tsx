// 분석화면 하단 다시선택, 업로드 분석 시작 버튼
import { Button } from "../../atoms/button/Button";

export function ActionsAnalyze({
  onBack,
  onAnalyze,
  disabled,
}: {
  onBack: () => void;
  onAnalyze: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button size="md" bgColor="white" onClick={onBack} className="border">
        다시 선택
      </Button>
      <Button
        size="md"
        bgColor="blue"
        onClick={onAnalyze}
        disabled={disabled}
        textColor="white"
      >
        업로드 분석 시작
      </Button>
    </div>
  );
}
