import { useEffect, useState } from "react";
import { Modal } from "../../atoms/modal/modal.tsx";
import { UploadStep1 } from "./UploadStep1.tsx";
import { UploadStep2 } from "./UploadStep2.tsx";
import { UploadStep3 } from "./UploadStep3.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
type Step = 1 | 2 | 3;

export const FileUploadModalFlow = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      resetFlow();
    }
  }, [isOpen]);

  const resetFlow = () => {
    setStep(1);
    setFile(null);
    setAnalysisResult([]);
  };

  const goToStep = (s: Step) => setStep(s);

  const handleAnalyze = () => {
    setTimeout(() => {
      setAnalysisResult(["단어1", "단어2"]);
      goToStep(3);
    }, 1500);
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
            />
          )
        );
      case 3:
        return (
          file && (
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderStep()}
    </Modal>
  );
};
