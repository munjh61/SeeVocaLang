import { useEffect, useMemo, useState } from "react";
import { Text } from "../../atoms/text/Text";
import { useUploadMode } from "../../../hooks/UseUploadMode.ts";
import { usePreviewUrl } from "../../../hooks/UsePreviewUrl.ts";
import { useFolderListByWordId } from "../../../hooks/UseFolderList.ts";
import { saveWords } from "../../../service/WordService.ts";
import { PreviewSection } from "./PreviewSection.tsx";
import { ActionsAnalyze } from "./ActionAnalyze.tsx";
import { ActionsSave } from "./ActionSave.tsx";
import { AnalyzeFailCard, DuplicateCard } from "../AnalyzeResultCards";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";
import { UpdateWordImage } from "../../../api/upload/UpdateWordImage.ts";
import type { AxiosError } from "axios";
import { getAllFolderIds } from "../../../api/upload/GetWordFolders.ts";

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

  // ✅ 저장(신규) 선택 목록 (UI 선택용 — 필요 시 유지)
  const [selectedFolderIds, setSelectedFolderIds] = useState<number[]>(
    folderId != null ? [folderId] : []
  );

  // ✅ 모든 폴더 ID (getAllFolderIds 결과)
  const [allFolderIds, setAllFolderIds] = useState<number[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const ids = await getAllFolderIds();
        setAllFolderIds(ids);
      } catch (e) {
        console.error("모든 폴더 ID 조회 실패:", e);
      }
    })();
  }, []);

  const { mode, wordId, existingImageUrl } = useUploadMode(result);
  const previewUrl = usePreviewUrl(file);

  const shouldShowFolderSelect = mode === "save" || mode === "replace";
  const shouldFetchFolders =
    !!wordId && shouldShowFolderSelect && folderId == null;
  const showAnalyzeFail =
    requestedAnalyze && !isAnalyzing && mode === "analyze";

  const {
    folders: wordFolders, // { folderId, name }[]
    loading: foldersLoading,
    error: foldersError,
  } = useFolderListByWordId(shouldFetchFolders, wordId ?? null);

  // ⬇️ UI에 넣어줄 folders: getAllFolderIds()의 결과를 기반으로,
  // useFolderListByWordId에서 가져온 이름과 매칭해서 보여준다.
  const fallbackCardFolders: { folder_id: number; name: string }[] =
    useMemo(() => {
      if (!allFolderIds.length) return [];
      return allFolderIds.map(id => {
        const matched = wordFolders.find(f => f.folderId === id);
        return { folder_id: id, name: matched?.name ?? `폴더 #${id}` };
      });
    }, [allFolderIds, wordFolders]);

  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  // ✅ 교체 (기존 단어 이미지 교체)
  const onReplace = async () => {
    if (!wordId || !result?.image_key) {
      alert("교체할 단어 정보가 준비되지 않았습니다.");
      return;
    }
    try {
      setIsProcessing(true);
      const msg = await UpdateWordImage(wordId, result.image_key);
      alert(msg);
      onDone?.(msg);
    } catch (e) {
      const err = e as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message ??
        err.message ??
        "이미지 교체에 실패했습니다.";
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ 저장 (신규 저장: 모든 폴더 ID 사용)
  // ✅ 저장 (신규 저장: "선택한 폴더"만 사용)
  const wordSave = async () => {
    if (!result?.image_key || !result?.name_en || !result?.name_ko) {
      alert("저장할 단어 정보가 준비되지 않았습니다.");
      return;
    }
    if (selectedFolderIds.length === 0) {
      alert("저장할 폴더를 선택하세요.");
      return;
    }

    try {
      setIsProcessing(true);
      // ⬇️ 여기! 전체 폴더가 아니라 선택한 폴더만 보냅니다.
      const res = await saveWords(
        result.name_en,
        result.name_ko,
        result.image_key,
        selectedFolderIds
      );
      alert(res.message);
      onDone?.(res.message);
    } catch (e) {
      const message = e instanceof Error ? e.message : "저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 버튼 비활성화: allFolderIds가 있다면 그걸 기준으로, 없으면 선택기준
  const hasAnyFolder =
    (allFolderIds.length ? allFolderIds.length : selectedFolderIds.length) > 0;
  const disabledCommon =
    isProcessing ||
    isAnalyzing ||
    foldersLoading ||
    !!foldersError ||
    !hasAnyFolder;

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
          {/* replace 모드에서도 “신규 저장” 허용: folders에 getAllFolderIds 기반 값 전달 */}
          <ActionsSave
            nameEn={result?.name_en ?? ""}
            nameKo={result?.name_ko ?? ""}
            folders={fallbackCardFolders}
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
          folders={fallbackCardFolders}
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
