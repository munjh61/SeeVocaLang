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

import {
  AnalyzeFailCard,
  DuplicateCard,
  SuccessCard,
  type Folder as CardFolder,
} from "../AnalyzeResultCards.tsx";
import { getWordFolders } from "../../../api/GetWordFolders.ts";
import { ImageInfoCard } from "../ImageInfoCard.tsx";
import type { AnalysisResult } from "../../../api/PhotoUpload.ts";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [originviewUrl, setOriginviewUrl] = useState<string>("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [foldersLoading, setFoldersLoading] = useState(false);
  const [foldersError, setFoldersError] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(
    folderId ?? null
  );
  const [requestedAnalyze, setRequestedAnalyze] = useState(false);

  const userId = useAuthStore.getState().user?.userId ?? 1;

  const mode = useMemo<"analyze" | "replace" | "save">(() => {
    if (!result) return "analyze";
    return result.word.word_id ? "replace" : "save";
  }, [result]);

  const shouldShowFolderSelect = mode === "save";
  const showAnalyzeFail =
    requestedAnalyze && !isAnalyzing && mode === "analyze";

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    setOriginviewUrl(result?.word?.image_url ?? "");
  }, [result?.word?.image_url]);

  useEffect(() => {
    if (!shouldShowFolderSelect) return;
    if (folderId != null) return;

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

  // 비동기 호출이라면 이렇게 안전하게 호출
  useEffect(() => {
    if (!result?.word.word_id) return;
    (async () => {
      try {
        const list = await getWordFolders(result.word.word_id);
        console.log("getWordFolders:", list);
      } catch (e) {
        console.error("getWordFolders 실패", e);
      }
    })();
  }, [result?.word.word_id]);

  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  const handleReplace = async () => {
    if (!result) return;
    try {
      setIsProcessing(true);
      const msg = await WordImageUploadApi(
        result.word.word_id,
        result.image_key
      );
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

  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        업로드 정보 확인
      </Text>

      {/* 미리보기 섹션 */}
      {mode === "replace" ? (
        <div className="flex flex-row gap-5">
          {/* 기존 이미지 */}
          <ImageInfoCard
            title="기존 이미지"
            src={originviewUrl}
            alt="기존 이미지 미리보기"
            showInfo={false}
            badge
            result={result ?? undefined}
          />
          {/* 새 이미지 */}
          <ImageInfoCard
            title="새로운 이미지"
            src={previewUrl}
            alt="새로운 이미지 미리보기"
            file={file}
          />
        </div>
      ) : (
        // replace가 아닐 때만 1개짜리 노출
        <ImageInfoCard
          title="새로운 이미지"
          src={previewUrl}
          alt="새로운 이미지 미리보기"
          file={file}
        />
      )}

      {showAnalyzeFail && (
        <AnalyzeFailCard
          onBack={onBack}
          onRetry={handleAnalyzeStart}
          isRetrying={isAnalyzing}
        />
      )}

      {mode === "replace" && !showAnalyzeFail && (
        <DuplicateCard
          nameEn={result?.name_en ?? ""} // string 보장
          nameKo={result?.name_ko ?? ""} // string 보장
          onBack={onBack}
          onReplace={handleReplace}
          isProcessing={isProcessing}
          disabled={isProcessing || isAnalyzing}
        />
      )}

      {mode === "save" && !showAnalyzeFail && (
        <SuccessCard
          nameEn={result?.name_en ?? ""} // string 보장
          nameKo={result?.name_ko ?? ""} // string 보장
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
          <Button size="md" bgColor="white" onClick={onBack} className="border">
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
