import { useEffect, useMemo, useState } from "react";
import type { AxiosError } from "axios"; // [ADDED] 에러 타입 안전하게
import { Text } from "../../atoms/text/Text";
import { Button } from "../../atoms/button/Button";
import {
  SaveRecognizedWordApi,
  type SaveRecognizedWordRequest,
} from "../../../api/SaveRecognizedWord.ts";
import { WordImageUploadApi } from "../../../api/WordImageUploadApi.ts";
import { getfolders } from "../../../api/FolderAPI.ts";
import { useAuthStore } from "../../../stores/AuthStore.ts";

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

  // 로그인 되어있는 해당유저 id 불러온다.
  const userId = useAuthStore.getState().user?.userId ?? 1;

  // ---------------- 분기관리 ----------------
  const analyzed = !!result; // 사진 분석 완료 여부
  const isDuplicate = !!result?.word_id; // 전역 단어 존재 여부
  const canReplace = analyzed && isDuplicate; // 이미지 교체 가능 상태
  const canSave = analyzed && !isDuplicate; // 새 단어 저장 가능 상태

  // 폴더 선택 UI가 노출 여부
  const shouldShowFolderSelect = canSave;

  // 메인 버튼 라벨
  const primaryLabel = useMemo(() => {
    if (!analyzed) return "업로드 분석 시작";
    return isDuplicate ? "이미지만 교체" : "단어 저장";
  }, [analyzed, isDuplicate]);

  // 메인 버튼 비활성 조건
  const primaryDisabled =
    isAnalyzing ||
    isProcessing ||
    (canSave && (foldersLoading || !!foldersError || selectedFolderId == null));

  // ---------------- effects ----------------
  // 파일 미리보기 URL
  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // 폴더 목록 로딩: "새 저장" 케이스에서만
  useEffect(() => {
    if (!shouldShowFolderSelect) return;
    if (folderId != null) return; // 외부에서 이미 선택값이 들어온 경우 스킵

    let mounted = true;
    (async () => {
      try {
        setFoldersLoading(true);
        setFoldersError(null);

        const list = await getfolders(userId); // [CHANGED] getState 직접 호출 대신 캐시된 userId 사용

        if (!mounted) return;

        // [CHANGED] any 제거: 필요한 속성만 구조분해로 타입 명시
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
        // [CHANGED] any → AxiosError로 안전하게
        const err = e as AxiosError<{ message?: string }>;
        if (!mounted) return;
        const msg =
          err.response?.data?.message ||
          err.message ||
          "폴더 목록을 불러오지 못했습니다.";
        setFoldersError(msg);
      } finally {
        if (mounted) setFoldersLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [shouldShowFolderSelect, folderId, userId, selectedFolderId]);

  // 외부에서 folderId가 바뀌면 동기화
  useEffect(() => {
    if (folderId != null) setSelectedFolderId(folderId);
  }, [folderId]);

  // ---------------- handlers ----------------
  const handlePrimaryClick = async () => {
    // 아직 분석 전이면 분석부터
    if (!analyzed) {
      onAnalyze();
      return;
    }

    try {
      setIsProcessing(true);

      if (canReplace) {
        // 전역 단어가 이미 있음 → "이미지만 교체"
        const msg = await WordImageUploadApi(
          result!.word_id,
          result!.image_key
        );
        alert(msg ?? "이미지가 성공적으로 수정되었습니다.");
        onDone?.(msg);
        return;
      }

      // 새로 저장하는 케이스
      if (canSave) {
        if (selectedFolderId == null) {
          alert("저장할 폴더를 선택해 주세요.");
          return;
        }
        const body: SaveRecognizedWordRequest = {
          name_en: result!.name_en,
          name_ko: result!.name_ko,
          image_key: result!.image_key,
          folder_id: selectedFolderId,
        };
        const msg = await SaveRecognizedWordApi(body);
        alert(msg ?? "단어가 저장되었습니다.");
        onDone?.(msg);
        return;
      }
    } catch (e) {
      // [CHANGED] any → AxiosError
      const err = e as AxiosError<{ message?: string }>;
      const message =
        err.response?.data?.message ||
        err.message ||
        (canReplace
          ? "이미지 교체에 실패했습니다."
          : "단어 저장에 실패했습니다.");
      alert(message);
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

      {canReplace && (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
          동일한 단어가 이미 존재합니다. 기존 단어의 <b>이미지</b>만 교체할 수
          있어요.
        </div>
      )}

      {shouldShowFolderSelect && (
        <div className="rounded-lg border p-3">
          <Text size="sm" weight="bold" className="mb-2">
            저장할 폴더 선택
          </Text>

          {foldersLoading ? (
            <p className="text-sm text-gray-500">폴더를 불러오는 중...</p>
          ) : foldersError ? (
            <p className="text-sm text-red-600">{foldersError}</p>
          ) : folders.length === 0 ? (
            <p className="text-sm text-gray-500">
              폴더가 없습니다. 먼저 단어장을 생성해 주세요.
            </p>
          ) : (
            <select
              className="w-full rounded border px-3 py-2 text-sm"
              value={selectedFolderId ?? ""}
              onChange={e => setSelectedFolderId(Number(e.target.value))}
            >
              {folders.map(f => (
                <option key={f.folderId} value={f.folderId}>
                  {f.name} (ID: {f.folderId})
                </option>
              ))}
            </select>
          )}
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-1">
          <Text size="sm" weight="bold" className="mb-1">
            미리보기
          </Text>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="rounded-lg shadow-lg w-full max-w-[240px]"
            />
          ) : (
            <div className="w-full max-w-[240px] aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500">
              미리보기 없음
            </div>
          )}
        </div>

        <div className="flex-1 text-sm text-gray-600">
          <Text weight="bold">파일 정보</Text>
          <p>이름: {file.name}</p>
          <p>크기: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          <p>형식: {file.type}</p>
          <p>업로드 시간: {new Date().toLocaleTimeString()}</p>

          {analyzed && (
            <div className="mt-3">
              <Text weight="bold">인식된 단어</Text>
              <p>영문: {result?.name_en ?? "-"}</p>
              <p>한글: {result?.name_ko ?? "-"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          size="md"
          bgColor="gray"
          onClick={onBack}
          disabled={primaryDisabled}
        >
          다시 선택
        </Button>
        <Button
          size="md"
          bgColor="gradientPurple"
          onClick={handlePrimaryClick}
          disabled={primaryDisabled}
        >
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
};
