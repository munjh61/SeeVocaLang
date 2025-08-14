import { ImageInfoCard } from "../ImageInfoCard";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";

type Props = {
  mode: "analyze" | "replace" | "save";
  existingImageUrl: string;
  previewUrl: string;
  file: File;
  result?: AnalysisResult | null;
};

export function PreviewSection({
  mode,
  existingImageUrl,
  previewUrl,
  file,
  result,
}: Props) {
  if (mode === "replace") {
    return (
      <div className="flex flex-row gap-5">
        <ImageInfoCard
          title="기존 이미지"
          src={existingImageUrl}
          alt="기존 이미지"
          showInfo={false}
          badge
          result={result}
        />
        <ImageInfoCard
          title="새로운 이미지"
          src={previewUrl}
          alt="새 이미지"
          file={file}
        />
      </div>
    );
  }
  return (
    <ImageInfoCard
      title="새로운 이미지"
      src={previewUrl}
      alt="새 이미지"
      file={file}
    />
  );
}
