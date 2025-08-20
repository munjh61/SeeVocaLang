import { Icon } from "../../atoms/icon/Icon";
import UploadIcon from "../../../asset/image_upload.svg?react";
import { Text } from "../../atoms/text/Text";
import React, { useState } from "react";

type Props = {
  onNext: (file: File) => void;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const UploadStep1 = ({ onNext }: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert("⚠️ 10MB 이하의 이미지만 업로드할 수 있어요.");
      return;
    }
    onNext(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-6">
      <Text size="xl" weight="bold" className="flex justify-start gap-2">
        사진 업로드
      </Text>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        className={`flex flex-col items-center gap-4 border-2 border-dotted rounded-md p-4 transition-colors
          ${isDragging ? "border-[#9568EF] bg-purple-50" : "border-[#C8D1E1]"}
        `}
      >
        <label
          htmlFor="upload-file"
          className="relative w-20 h-20 bg-gradient-to-r from-[#8197F2] to-[#9568EF] text-white rounded-full flex items-center justify-center cursor-pointer active:scale-95"
        >
          <Icon icon={UploadIcon} color="white" size="lg" />
          <span className="absolute top-0 right-0 bg-yellow-400 text-white text-xs px-1.5 py-0.5 rounded-full">
            ✨
          </span>
        </label>

        <Text size="xl" weight="bold">
          파일을 드래그하거나 클릭하여 업로드
        </Text>
        <Text size="sm" color="muted">
          JPG, PNG, WEBP 파일을 지원합니다 (최대 10MB)
        </Text>

        <input
          type="file"
          accept="image/*"
          id="upload-file"
          onChange={handleFileChange}
          className="hidden"
          aria-label="파일 업로드"
        />
      </div>
    </div>
  );
};
