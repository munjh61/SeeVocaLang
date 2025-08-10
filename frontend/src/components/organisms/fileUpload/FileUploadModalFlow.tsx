import { useEffect, useState, useCallback } from "react";
import { Modal } from "../../atoms/modal/modal.tsx";
import { UploadStep1 } from "./UploadStep1.tsx";
import { UploadStep2 } from "./UploadStep2.tsx";
import { analyzeImage } from "../../../api/PhotoUpload.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  word_id: number;
};

type Step = 1 | 2;

export const FileUploadModalFlow = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  // ✅ 단일 리셋 함수 (모달 닫힘/다시 선택에 공용)
  const resetAll = useCallback(() => {
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setFile(null);
    setStep(1);
  }, []);

  // 모달 닫히면 모든 상태 초기화
  useEffect(() => {
    if (!isOpen) resetAll();
  }, [isOpen, resetAll]);

  const goToStep = (s: Step) => setStep(s);

  // 파일 분석만 수행 (저장/교체는 UploadStep2에서)
  // 파일 분석만 수행 (저장/교체는 UploadStep2에서)
  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      console.log("analysis result: ", result);
      setAnalysisResult(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("분석 실패:", error.message);
      } else {
        console.error("분석 실패: 알 수 없는 오류", error);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const busy = isAnalyzing;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UploadStep1
            // 파일 인풋 완전 초기화용 재마운트 키
            key={`step1-${file ? "has" : "none"}`}
            onNext={selectedFile => {
              setFile(selectedFile);
              goToStep(2);
            }}
          />
        );
      case 2:
        return (
          file && (
            <UploadStep2
              file={file}
              onBack={resetAll} // ✅ “다시 선택”도 같은 리셋 함수 사용
              onAnalyze={handleAnalyze}
              isAnalyzing={busy}
              result={analysisResult}
              onDone={() => onClose()} // 닫히면 useEffect 통해 resetAll 호출됨
            />
          )
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderStep()}
    </Modal>
  );
};
