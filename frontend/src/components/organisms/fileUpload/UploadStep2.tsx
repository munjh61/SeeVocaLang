import { useMemo, useState } from "react";
import { Text } from "../../atoms/text/Text";
import { useUploadMode } from "../../../hooks/UseUploadMode.ts";
import { usePreviewUrl } from "../../../hooks/UsePreviewUrl.ts";
import { useFolderListByWordId } from "../../../hooks/UseFolderList.ts";
import { replaceImage } from "../../../service/WordService.ts";
import { PreviewSection } from "./PreviewSection.tsx";
import { ActionsAnalyze } from "./ActionAnalyze.tsx";
import { ActionsSave } from "./ActionSave.tsx";
import { AnalyzeFailCard, DuplicateCard } from "../AnalyzeResultCards";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";
import { UpdateWordImage } from "../../../api/upload/UpdateWordImage.ts";
import type { AxiosError } from "axios";

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

  // ✅ 저장(신규) 선택 목록
  const [selectedFolderIds, setSelectedFolderIds] = useState<number[]>(
    folderId != null ? [folderId] : []
  );
  // ✅ 교체(중복) 대상 폴더 목록 — 선택 박스 없음, 자동 세팅 후 그대로 사용

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

  // ⬇️ replace 모드일 때, “이미 단어가 존재하는 폴더들”을 자동으로 수집

  // 카드가 기대하는 형태로 매핑 (folder_id, name)
  const cardFolders: { folder_id: number; name: string }[] = useMemo(
    () => folders.map(f => ({ folder_id: f.folderId, name: f.name })),
    [folders]
  );

  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  // ✅ 교체는 선택 박스가 아니라, 전달받은 배열(ids)로만 실행
  const onReplace = async () => {
    if (!wordId || !result?.image_key) {
      alert("교체할 단어 정보가 준비되지 않았습니다.");
      return;
    }

    try {
      setIsProcessing(true);

      // ⬇️ 단어 이미지 자체를 교체 (폴더 ids는 참고 로그만)
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

  const wordSave = async () => {
    if (!wordId || !result?.image_key) {
      alert("저장할 단어 정보가 준비되지 않았습니다.");
      return;
    }
    if (selectedFolderIds.length === 0) {
      alert("저장할 폴더를 선택하세요.");
      return;
    }
    console.log("wordSave");
    console.log("wordId: ", wordId);
    console.log("selectedFolderIds: ", selectedFolderIds);
    console.log("result.image_key: ", result.image_key);

    try {
      setIsProcessing(true);
      const msg = await replaceImage(
        wordId,
        selectedFolderIds,
        result.image_key
      );
      console.log("💾 save targets:", selectedFolderIds);
      alert(msg);
      onDone?.(msg);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "저장에 실패했습니다.";
      alert(message);
    } finally {
      setIsProcessing(false);
    }
  };

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
          {/* replace 모드에서도 “신규 저장”이 필요하면 유지 */}
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
