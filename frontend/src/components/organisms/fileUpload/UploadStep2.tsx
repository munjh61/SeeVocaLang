import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios";
import { Text } from "../../atoms/text/Text";
import { Button } from "../../atoms/button/Button";
import {
  SaveRecognizedWordApi,
  type SaveRecognizedWordRequest,
} from "../../../api/SaveRecognizedWord.ts";
import { WordImageUploadApi } from "../../../api/WordImageUploadApi.ts";
import { getfolders } from "../../../api/FolderAPI.ts";
import { useAuthStore } from "../../../stores/AuthStore.ts";

// 새로 만든 카드 컴포넌트들
import {
  Badge,
  AnalyzeFailCard,
  DuplicateCard,
  SuccessCard,
  type Folder as CardFolder,
} from "../AnalyzeResultCards.tsx";

type AnalysisResult = {
  name_en: string;
  name_ko: string;
  image_key: string;
  word_id: number;
};

type Folder = { folderId: number; name: string };

type Props = {
  file: File;
  onBack: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  folderId?: number;
  onDone?: (message?: string) => void;
};

export const UploadStep2 = ({
  file,
  onBack,
  onAnalyze,
  isAnalyzing,
  result,
  folderId,
  onDone,
}: Props) => {
  // ---------------- state ----------------
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [foldersError, setFoldersError] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(
    folderId ?? null
  );
  const [requestedAnalyze, setRequestedAnalyze] = useState(false);

  // 로그인된 사용자
  const userId = useAuthStore.getState().user?.userId ?? 1;

  // ---------------- 분기관리 ----------------
  const mode = useMemo<"analyze" | "replace" | "save">(() => {
    if (!result) return "analyze";
    return result.word_id ? "replace" : "save";
  }, [result]);

  const shouldShowFolderSelect = mode === "save";
  const showAnalyzeFail =
    requestedAnalyze && !isAnalyzing && mode === "analyze";

  // ---------------- effects ----------------
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!shouldShowFolderSelect) return;
    if (folderId != null) return; // 외부에서 이미 선택값이 들어온 경우 스킵

    let mounted = true;
    (async () => {
      try {
        setFoldersLoading(true);
        setFoldersError(null);
        const list = await getfolders(userId);

        if (!mounted) return;

        const simplified: Folder[] = (list ?? []).map(
          ({ folderId, name }: { folderId: number; name: string }) => ({
            folderId: Number(folderId),
            name: String(name ?? ""),
          })
        );

        setFolders(simplified);
        if (simplified.length > 0 && selectedFolderId == null) {
          setSelectedFolderId(simplified[0].folderId);
        }
      } catch (e) {
        const err = e as AxiosError<{ message?: string }>;
        if (!mounted) return;
        setFoldersError(
          err.response?.data?.message ||
            err.message ||
            "폴더 목록을 불러오지 못했습니다."
        );
      } finally {
        if (mounted) setFoldersLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [shouldShowFolderSelect, folderId, userId, selectedFolderId]);

  useEffect(() => {
    if (folderId != null) setSelectedFolderId(folderId);
  }, [folderId]);

  // ---------------- handlers ----------------
  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  const handleReplace = async () => {
    if (!result) return;
    try {
      setIsProcessing(true);
      const msg = await WordImageUploadApi(result.word_id, result.image_key);
      alert(msg ?? "이미지가 성공적으로 수정되었습니다.");
      onDone?.(msg);
    } catch (e) {
      const err = e as AxiosError<{ message?: string }>;
      alert(
        err.response?.data?.message ||
          err.message ||
          "이미지 교체에 실패했습니다."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    if (!result || selectedFolderId == null) return;
    try {
      setIsProcessing(true);
      const body: SaveRecognizedWordRequest = {
        name_en: result.name_en,
        name_ko: result.name_ko,
        image_key: result.image_key,
        folder_id: selectedFolderId,
      };
      const msg = await SaveRecognizedWordApi(body);
      alert(msg ?? "단어가 저장되었습니다.");
      onDone?.(msg);
    } catch (e) {
      const err = e as AxiosError<{ message?: string }>;
      alert(
        err.response?.data?.message ||
          err.message ||
          "단어 저장에 실패했습니다."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // ---------------- render ----------------
  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        업로드 정보 확인
      </Text>

      {/* === 미리보기 + 정보 카드 === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 미리보기 */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <Text size="sm" weight="bold" className="mb-2">
            미리보기
          </Text>
          <div className="relative rounded-xl overflow-hidden ring-1 ring-gray-200">
            {previewUrl ? (
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center text-sm text-gray-500 bg-gray-50">
                미리보기 없음
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>{file.type || "unknown/type"}</Badge>
            <Badge>{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
            <Badge>{file.name}</Badge>
          </div>
        </div>

        {/* 파일 정보 */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm flex flex-col h-full">
          <Text
            size="sm"
            weight="bold"
            className="mb-3 border-b-2 border-gray-400 pb-2"
          >
            파일 정보
          </Text>
          <dl className="grid grid-cols-3 gap-x-4 gap-y-3 text-sm flex-1 px-2">
            <dt className="col-span-1 text-gray-500">이름</dt>
            <dd className="col-span-2 text-gray-800 truncate">{file.name}</dd>

            <dt className="col-span-1 text-gray-500">크기</dt>
            <dd className="col-span-2 text-gray-800">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </dd>

            <dt className="col-span-1 text-gray-500">형식</dt>
            <dd className="col-span-2 text-gray-800">{file.type || "-"}</dd>

            <dt className="col-span-1 text-gray-500">업로드 시간</dt>
            <dd className="col-span-2 text-gray-800">
              {new Date().toLocaleTimeString()}
            </dd>

            {/* 추가 정보 */}
            <dt className="col-span-1 text-gray-500">마지막 수정</dt>
            <dd className="col-span-2 text-gray-800">
              {file.lastModified
                ? new Date(file.lastModified).toLocaleString()
                : "-"}
            </dd>
          </dl>

          {/* 하단 구분선 + 파일 상태 */}
          <div className="mt-auto pt-3 border-t-2 border-gray-400 flex items-center justify-between text-xs text-gray-500">
            <span>파일 상태: 준비 완료</span>
            <span>📂 {file.type.split("/")[0] || "알 수 없음"}</span>
          </div>
        </div>
      </div>
      {/* === /미리보기 + 정보 카드 === */}

      {/* === 상태 카드: 미리보기/정보 아래 === */}
      {showAnalyzeFail && (
        <AnalyzeFailCard
          onBack={onBack}
          onRetry={handleAnalyzeStart}
          isRetrying={isAnalyzing}
        />
      )}

      {mode === "replace" && !showAnalyzeFail && (
        <DuplicateCard
          nameEn={result?.name_en}
          nameKo={result?.name_ko}
          onBack={onBack}
          onReplace={handleReplace}
          isProcessing={isProcessing}
          disabled={isProcessing || isAnalyzing}
        />
      )}

      {mode === "save" && !showAnalyzeFail && (
        <SuccessCard
          nameEn={result?.name_en}
          nameKo={result?.name_ko}
          folders={folders as CardFolder[]}
          foldersLoading={foldersLoading}
          foldersError={foldersError}
          selectedFolderId={selectedFolderId}
          onChangeFolder={setSelectedFolderId}
          onBack={onBack}
          onSave={handleSave}
          isProcessing={isProcessing}
          disabled={
            isProcessing ||
            isAnalyzing ||
            foldersLoading ||
            !!foldersError ||
            selectedFolderId == null
          }
        />
      )}

      {mode === "analyze" && !requestedAnalyze && (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            size="md"
            bgColor="white"
            onClick={onBack}
            className={"border"}
          >
            다시 선택
          </Button>
          <Button
            size="md"
            bgColor="blue"
            onClick={handleAnalyzeStart}
            disabled={isAnalyzing}
            textColor="white"
          >
            업로드 분석 시작
          </Button>
        </div>
      )}
    </div>
  );
};
