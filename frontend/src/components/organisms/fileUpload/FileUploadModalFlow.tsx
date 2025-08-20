import { useEffect, useState, useCallback, useMemo } from "react";
import { Modal } from "../../atoms/modal/modal.tsx";
import { UploadStep1 } from "./UploadStep1.tsx";
import { UploadStep2 } from "./UploadStep2.tsx";
import { analyzeImage } from "../../../api/upload/AnalyzeImage.ts";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";
import { useUploadMode } from "../../../hooks/UseUploadMode.ts";

type Props = { isOpen: boolean; onClose: () => void };
type Step = 1 | 2;

export const FileUploadModalFlow = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>(1);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  // ✅ 부모에서 현재 모드 계산 (analyze | save | replace)
  const { mode } = useUploadMode(analysisResult);

  const resetAll = useCallback(() => {
    setIsAnalyzing(false);
    setAnalysisResult(null);
    setFile(null);
    setStep(1);
  }, []);

  useEffect(() => {
    if (!isOpen) resetAll();
  }, [isOpen, resetAll]);

  const goToStep = (s: Step) => setStep(s);

  // 파일 분석 (저장/교체는 Step2에서 처리)
  const handleAnalyze = async () => {
    if (!file || isAnalyzing) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(file);
      console.log("analysis result: ", result);
      setAnalysisResult(result);
    } catch (e) {
      console.error("분석 실패:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ✅ 스텝/모드별 사이즈 맵 (필요시 숫자만 조절)
  const SIZE_MAP = useMemo(
    () =>
      ({
        step1: "w-[520px]  h-[300px]",
        "step2:analyze": "w-[600px]  h-[450px]",
        "step2:save": "w-[600px] h-[630px]",
        "step2:replace": "w-[827px]  h-[550px]",
      }) as const,
    []
  );

  // ✅ 현재 상황에 맞는 패널 크기 클래스
  const panelSizeClass = useMemo(() => {
    if (step === 1) return SIZE_MAP.step1;
    if (mode === "save") return SIZE_MAP["step2:save"];
    if (mode === "replace") return SIZE_MAP["step2:replace"];
    return SIZE_MAP["step2:analyze"]; // 기본 analyze
  }, [step, mode, SIZE_MAP]);

  const renderStep = () => {
    if (step === 1) {
      return (
        <UploadStep1
          key={`step1-${file ? "has" : "none"}`} // 파일 인풋 초기화용
          onNext={selectedFile => {
            setFile(selectedFile);
            goToStep(2);
          }}
        />
      );
    }

    // step === 2
    return (
      file && (
        <UploadStep2
          file={file}
          onBack={resetAll}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          result={analysisResult}
          onDone={() => onClose()}
        />
      )
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      // ✅ 모드에 맞춰 크기 변경 + 부드러운 전환
      panelClassName={`transition-all duration-300 ${panelSizeClass}`}
    >
      {/* 내용만 스크롤 */}
      <div className="h-full max-h-full overflow-y-auto p-1 pr-2">
        {renderStep()}
      </div>
    </Modal>
  );
};
