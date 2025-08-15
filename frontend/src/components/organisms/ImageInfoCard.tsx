import React from "react";
import { Text } from "../atoms/text/Text";
import type { AnalysisResult } from "../../types/FileUploadType.ts";

type ImageInfoCardProps = {
  src: string;
  title: string;
  alt?: string;
  file?: File | null;
  showInfo?: boolean;
  statusText?: string;
  result?: AnalysisResult | null;
  uploadedAt?: Date;
  className?: string;
  height?: number | string; // 전체 높이
};

export const ImageInfoCard: React.FC<ImageInfoCardProps> = ({
  src,
  alt,
  title,
  file,
  showInfo = true,
  statusText = "준비 완료",
  uploadedAt,
  className = "",
  height = 300,
}) => {
  const sizeMB = file ? (file.size / 1024 / 1024).toFixed(2) : "0.00";
  const fileTypeGroup = file?.type?.split?.("/")?.[0] || "알 수 없음";
  const uploadedTime =
    uploadedAt?.toLocaleTimeString() ?? new Date().toLocaleTimeString();
  const lastModified = file?.lastModified
    ? new Date(file.lastModified).toLocaleString()
    : "-";

  return (
    <div
      className={`rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm flex flex-col  ${className}`}
      style={{ height }}
    >
      {/* 제목 */}
      <Text size="sm" weight="bold" className="mb-2 flex-none">
        {title}
      </Text>
      <div className="flex flex-row gap-5 ">
        {/* 미리보기 (비율 고정, 기존 크기 유지) */}
        <div className="flex-none">
          <div className="aspect-square rounded-xl overflow-hidden ring-1 ring-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
            {src ? (
              <img
                src={src}
                alt={alt ?? (file?.name ? `${file.name} 미리보기` : "preview")}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center text-sm text-gray-500 bg-gray-50">
                미리보기 없음
              </div>
            )}
          </div>
        </div>

        {/* 파일 정보 */}
        {showInfo && (
          <div className="flex-1 overflow-y-auto mt-4">
            <Text
              size="sm"
              weight="bold"
              className="mb-3 border-b-2 border-gray-400 pb-2"
            >
              파일 정보
            </Text>

            <dl className="space-y-1 text-sm px-2">
              <div className="flex items-center">
                <dt className="text-gray-500">이름</dt>
                <dd className="ml-auto text-gray-800 max-w-[60%] truncate">
                  {file?.name ?? "-"}
                </dd>
              </div>
              <div className="flex items-center">
                <dt className="text-gray-500">크기</dt>
                <dd className="ml-auto text-gray-800">{sizeMB} MB</dd>
              </div>
              <div className="flex items-center">
                <dt className="text-gray-500">형식</dt>
                <dd className="ml-auto text-gray-800">{file?.type || "-"}</dd>
              </div>
              <div className="flex items-center">
                <dt className="text-gray-500">업로드 시간</dt>
                <dd className="ml-auto text-gray-800">{uploadedTime}</dd>
              </div>
              <div className="flex items-center">
                <dt className="text-gray-500">마지막 수정</dt>
                <dd className="ml-10 text-gray-800">{lastModified}</dd>
              </div>
            </dl>

            <div className="mt-4 pt-3 border-t-2 border-gray-400 flex items-center justify-between text-xs text-gray-500">
              <span>파일 상태: {statusText}</span>
              <span>📂 {fileTypeGroup}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
