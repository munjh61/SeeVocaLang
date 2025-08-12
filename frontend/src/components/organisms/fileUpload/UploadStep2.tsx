// UploadStep2.tsx (핵심 부분만)
import { useMemo, useState } from "react";
import { Text } from "../../atoms/text/Text";
import { useUploadMode } from "../../../hooks/UseUploadMode.ts";
import { usePreviewUrl } from "../../../hooks/UsePreviewUrl.ts";
// 주의: 경로 확인
import { useFolderListByWordId } from "../../../hooks/UseFolderList.ts";
import { replaceImage } from "../../../service/WordService.ts";
import { PreviewSection } from "./PreviewSection.tsx";
import { ActionsAnalyze } from "./ActionAnalyze.tsx";
import { ActionsSave } from "./ActionSave.tsx";
import { AnalyzeFailCard, DuplicateCard } from "../AnalyzeResultCards";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";

export function UploadStep2(props: {
  file: File;
  onBack: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  folderId?: number;
  onDone?: (message?: string) => void;
}) {
  const { file, onBack, onAnalyze, isAnalyzing, result, folderId, onDone } =
    props;

  const [requestedAnalyze, setRequestedAnalyze] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ 초기값: 단일 선택이 넘어오면 배열로 감싸서 세팅
  const [selectedFolderIds, setSelectedFolderIds] = useState<number[]>(
    folderId != null ? [folderId] : []
  );

  const [exsistingFolderIds, setExistingFolderIds] = useState<number[]>(
    folderId != null ? [folderId] : []
  );

  const { mode, wordId, existingImageUrl } = useUploadMode(result);
  const previewUrl = usePreviewUrl(file);

  const shouldShowFolderSelect = mode === "save" || mode === "replace";
  const shouldFetchFolders =
    !!wordId && shouldShowFolderSelect && folderId == null;
  const showAnalyzeFail =
    requestedAnalyze && !isAnalyzing && mode === "analyze";

  const {
    folders,
    loading: foldersLoading,
    error: foldersError,
  } = useFolderListByWordId(shouldFetchFolders, wordId ?? null);

  // 카드가 기대하는 형태로 매핑 (folder_id, name)
  const cardFolders: { folder_id: number; name: string }[] = useMemo(
    () => folders.map(f => ({ folder_id: f.folderId, name: f.name })),
    [folders]
  );

  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  const onReplace = async () => {
    if (!wordId || !result?.image_key)
      return alert("교체할 단어 정보가 준비되지 않았습니다.");

    if (exsistingFolderIds.length === 0)
      return alert("교체할 폴더를 선택하세요.");

    try {
      setIsProcessing(true);
      // ✅ 체크박스에서 선택한 folder_id 배열 그대로 전달
      const msg = await replaceImage(
        wordId,
        exsistingFolderIds,
        result.image_key
      );
      console.log(exsistingFolderIds);
      alert(msg);
      onDone?.(msg);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const wordSave = async () => {
    if (!wordId || !result?.image_key)
      return alert("교체할 단어 정보가 준비되지 않았습니다.");

    if (selectedFolderIds.length === 0)
      return alert("교체할 폴더를 선택하세요.");

    try {
      setIsProcessing(true);
      // ✅ 체크박스에서 선택한 folder_id 배열 그대로 전달
      const msg = await replaceImage(
        wordId,
        selectedFolderIds,
        result.image_key
      );
      console.log(selectedFolderIds);
      alert(msg);
      onDone?.(msg);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ 멀티 저장: 백엔드가 배열을 받지 않으면 순차로 단건 호출
  // const onSaveMany = async (ids: number[]) => {
  //   if (!result) return alert("저장할 분석 결과가 없습니다.");
  //   if (ids.length === 0) return alert("저장할 폴더를 선택하세요.");
  //
  //   try {
  //     setIsProcessing(true);
  //     for (const fid of ids) {
  //       await saveWord({
  //         name_en: result.name_en ?? "",
  //         name_ko: result.name_ko ?? "",
  //         image_key: result.image_key ?? "",
  //         folder_id: fid,
  //       });
  //     }
  //     alert("단어가 선택한 폴더에 저장되었습니다.");
  //     onDone?.("저장 완료");
  //   } catch (e: any) {
  //     alert(e.message || "저장에 실패했습니다.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const disabledCommon =
    isProcessing ||
    isAnalyzing ||
    foldersLoading ||
    !!foldersError ||
    selectedFolderIds.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        업로드 정보 확인
      </Text>

      <PreviewSection
        mode={mode}
        existingImageUrl={existingImageUrl}
        previewUrl={previewUrl}
        file={file}
        result={result ?? undefined}
      />

      {showAnalyzeFail && (
        <AnalyzeFailCard
          onBack={onBack}
          onRetry={handleAnalyzeStart}
          isRetrying={isAnalyzing}
        />
      )}

      {/* 교체 모드에서도 폴더 선택 가능 */}
      {mode === "replace" && !showAnalyzeFail && (
        <div className="flex flex-col">
          <DuplicateCard
            nameEn={result?.name_en ?? ""}
            nameKo={result?.name_ko ?? ""}
            onBack={onBack}
            onReplace={onReplace}
            isProcessing={isProcessing}
            disabled={isProcessing || isAnalyzing || !wordId}
          />
          <ActionsSave
            nameEn={result?.name_en ?? ""}
            nameKo={result?.name_ko ?? ""}
            folders={cardFolders}
            foldersLoading={foldersLoading}
            foldersError={foldersError}
            selectedFolderIds={selectedFolderIds}
            onChangeSelected={setSelectedFolderIds}
            onBack={onBack}
            onSave={wordSave}
            disabled={disabledCommon}
          />
        </div>
      )}

      {mode === "save" && !showAnalyzeFail && (
        <ActionsSave
          nameEn={result?.name_en ?? ""}
          nameKo={result?.name_ko ?? ""}
          folders={cardFolders}
          foldersLoading={foldersLoading}
          foldersError={foldersError}
          selectedFolderIds={selectedFolderIds}
          onChangeSelected={setSelectedFolderIds}
          onBack={onBack}
          onSave={wordSave}
          disabled={disabledCommon}
        />
      )}

      {mode === "analyze" && !requestedAnalyze && (
        <ActionsAnalyze
          onBack={onBack}
          onAnalyze={handleAnalyzeStart}
          disabled={isAnalyzing}
        />
      )}
    </div>
  );
}
