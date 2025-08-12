// components/ImageInfoCard.tsx
import React from "react";
import { Text } from "../atoms/text/Text";
import { Badge } from "./AnalyzeResultCards.tsx";
import type { AnalysisResult } from "../../api/PhotoUpload.ts";

type ImageInfoCardProps = {
  /** 미리보기 이미지 URL (필수) */
  src: string;
  /** 카드 헤더 제목 */
  title: string;
  /** 이미지 대체 텍스트 */
  alt?: string;

  /** 파일 원본 (선택) — 있으면 아래 정보 자동 계산 */
  file?: File | null;

  /** 정보 섹션 노출 여부 (기본: true) */
  showInfo?: boolean;

  /** 상태 텍스트 (기본: '준비 완료') */
  statusText?: string;

  /** 배지 출력 여부 */
  badge?: boolean;

  /** 분석 결과 (배지에 사용) */
  result?: AnalysisResult | null;

  /** 업로드 시각 고정 (없으면 현재 시각) */
  uploadedAt?: Date;

  /** 추가 클래스 */
  className?: string;
};

export const ImageInfoCard: React.FC<ImageInfoCardProps> = ({
  src,
  alt,
  title,
  file,
  result,
  badge,
  showInfo = true,
  statusText = "준비 완료",
  uploadedAt,
  className = "",
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
      className={`rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-sm w-1/2 ${className}`}
    >
      {/* 미리보기 */}
      <Text size="sm" weight="bold" className="mb-2">
        {title}
      </Text>
      <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200">
        {src ? (
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={src}
              alt={alt ?? (file?.name ? `${file.name} 미리보기` : "preview")}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="aspect-square flex items-center justify-center text-sm text-gray-500 bg-gray-50">
            미리보기 없음
          </div>
        )}
      </div>

      {/* 배지 (옵션) — result가 있을 때만 출력 */}
      {badge && result && (
        <div className="mt-3 flex flex-row gap-3">
          {result.name_en && <Badge>{result.name_en}</Badge>}
          {result.name_ko && <Badge>{result.name_ko}</Badge>}
        </div>
      )}

      {/* 파일 정보 */}
      {showInfo && (
        <div className="mt-6">
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
              <dd className="ml-auto text-gray-800">{lastModified}</dd>
            </div>
          </dl>

          <div className="mt-4 pt-3 border-t-2 border-gray-400 flex items-center justify-between text-xs text-gray-500">
            <span>파일 상태: {statusText}</span>
            <span>📂 {fileTypeGroup}</span>
          </div>
        </div>
      )}
    </div>
  );
};
