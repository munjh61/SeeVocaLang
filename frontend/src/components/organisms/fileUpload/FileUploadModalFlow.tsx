import { useEffect, useState } from "react";
import { Modal } from "../../atoms/modal/modal.tsx";
import { UploadStep1 } from "./UploadStep1.tsx";
import { UploadStep2 } from "./UploadStep2.tsx";
import { UploadStep3 } from "./UploadStep3.tsx";
import { analyzeImage } from "../../../api/PhotoUpload.ts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  is_already_exist: boolean;
};
type Step = 1 | 2 | 3;

export const FileUploadModalFlow = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  useEffect(() => {
    if (!isOpen) {
      resetFlow();
    }
  }, [isOpen]);

  const resetFlow = () => {
    setStep(1);
    setFile(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const goToStep = (s: Step) => setStep(s);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    try {
      const result = await analyzeImage(file); // ← 이제 이건 AnalysisResult 타입
      setAnalysisResult(result);
      goToStep(3);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      console.error("❌ 분석 실패:", error.response?.data?.message);
      alert("분석에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UploadStep1
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
              onBack={() => goToStep(1)}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />
          )
        );
      case 3:
        return (
          file &&
          analysisResult && (
            <UploadStep3
              file={file}
              result={analysisResult}
              onClose={onClose}
            />
          )
        );
      default:
        return null;
    }
  };

  // ✅ 이 부분이 컴포넌트의 JSX 리턴
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderStep()}
    </Modal>
  );
};
