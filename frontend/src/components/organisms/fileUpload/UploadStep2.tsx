import { useEffect, useMemo, useState } from "react";
import { Text } from "../../atoms/text/Text";
import { useUploadMode } from "../../../hooks/UseUploadMode.ts";
import { usePreviewUrl } from "../../../hooks/UsePreviewUrl.ts";
import { saveWords } from "../../../service/WordService.ts";
import { PreviewSection } from "./PreviewSection.tsx";
import { ActionsAnalyze } from "./ActionAnalyze.tsx";
import { ActionsSave } from "./ActionSave.tsx";
import { AnalyzeFailCard, DuplicateCard } from "../AnalyzeResultCards";
import type { AnalysisResult } from "../../../types/FileUploadType.ts";
import { UpdateWordImage } from "../../../api/upload/UpdateWordImage.ts";
import type { AxiosError } from "axios";
import { getAllFolderIds } from "../../../api/upload/GetWordFolders.ts";
import { Modal } from "../../atoms/modal/modal.tsx";

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

  // ✅ 모든 폴더 ID
  const [allFolderIds, setAllFolderIds] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getAllFolderIds(); // [{ id, name }]
        setAllFolderIds(rows);
      } catch (e) {
        console.error("모든 폴더 조회 실패:", e);
      }
    })();
  }, []);

  const { mode, wordId, existingImageUrl } = useUploadMode(result);
  const previewUrl = usePreviewUrl(file);

  const showAnalyzeFail =
    requestedAnalyze && !isAnalyzing && mode === "analyze";

  // ✅ UI에 넣어줄 folders
  const folders = useMemo(
    () => allFolderIds.map(({ id, name }) => ({ folder_id: id, name })),
    [allFolderIds]
  );

  // -----------------------------
  // ✅ 알림 모달 상태
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeOnConfirm, setNoticeOnConfirm] = useState<() => void>(
    () => () => {}
  );
  // -----------------------------

  const handleAnalyzeStart = () => {
    setRequestedAnalyze(true);
    onAnalyze();
  };

  // ✅ 교체
  const onReplace = async () => {
    if (!wordId || !result?.image_key) {
      setNoticeMessage("교체할 단어 정보가 준비되지 않았습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
      return;
    }
    try {
      setIsProcessing(true);
      const msg = await UpdateWordImage(wordId, result.image_key);

      setNoticeMessage(msg);
      setNoticeOnConfirm(() => () => {
        setNoticeOpen(false);
        onDone?.(msg);
      });
      setNoticeOpen(true);
    } catch (e) {
      const err = e as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message ??
        err.message ??
        "이미지 교체에 실패했습니다.";

      setNoticeMessage(message);
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // ✅ 저장
  const wordSave = async () => {
    if (!result?.image_key || !result?.name_en || !result?.name_ko) {
      setNoticeMessage("❌ 저장할 단어 정보가 준비되지 않았습니다.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
      return;
    }
    if (selectedFolderIds.length === 0) {
      setNoticeMessage("❌ 저장할 폴더를 선택하세요.");
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
      return;
    }

    try {
      setIsProcessing(true);
      const res = await saveWords(
        result.name_en,
        result.name_ko,
        result.image_key,
        selectedFolderIds
      );

      setNoticeMessage(res.message);
      setNoticeOnConfirm(() => () => {
        setNoticeOpen(false);
        onDone?.(res.message);
      });
      setNoticeOpen(true);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "❌ 저장에 실패했습니다.";
      setNoticeMessage(message);
      setNoticeOnConfirm(() => () => setNoticeOpen(false));
      setNoticeOpen(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const disabledCommon = isProcessing || isAnalyzing || folders.length === 0;

  return (
    <>
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
          </div>
        )}

        {mode === "save" && !showAnalyzeFail && (
          <ActionsSave
            nameEn={result?.name_en ?? ""}
            nameKo={result?.name_ko ?? ""}
            folders={folders}
            foldersLoading={false}
            selectedFolderIds={selectedFolderIds}
            onChangeSelected={setSelectedFolderIds}
            onBack={onBack}
            onSave={wordSave}
            disabled={disabledCommon}
            foldersError={null}
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

      {/* ✅ 알림 모달 */}
      <Modal
        isOpen={noticeOpen}
        onClose={() => setNoticeOpen(false)}
        closeOnOverlayClick={false}
      >
        <div className="flex flex-col gap-10 py-6 px-8">
          <Text size="lg">{noticeMessage}</Text>
          <button
            className="self-center rounded bg-blue-500 hover:bg-blue-400 text-white px-4 py-2"
            onClick={() => {
              noticeOnConfirm();
            }}
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
}
