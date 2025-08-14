// ActionsSave.tsx
// 저장 성공시 나오는 성공 카드
import { SuccessCard } from "../AnalyzeResultCards";
import type { CardFolder } from "../../../types/FileUploadType.ts";

type Props = {
  nameEn: string;
  nameKo: string;
  folders: CardFolder[];
  foldersLoading: boolean;
  foldersError: string | null;
  selectedFolderIds: number[];
  onChangeSelected: (ids: number[]) => void;
  onBack: () => void;
  onSave: (ids: number[]) => void; // ✅ 배열 전달
  disabled: boolean;
  isProcessing?: boolean;
};

export function ActionsSave({
  nameEn,
  nameKo,
  folders,
  foldersLoading,
  foldersError,
  selectedFolderIds,
  onChangeSelected,
  onBack,
  onSave,
  disabled,
  isProcessing,
}: Props) {
  return (
    <SuccessCard
      nameEn={nameEn}
      nameKo={nameKo}
      folders={folders}
      foldersLoading={foldersLoading}
      foldersError={foldersError}
      selectedFolderIds={selectedFolderIds}
      onChangeSelected={onChangeSelected}
      onBack={onBack}
      onSave={onSave}
      disabled={disabled}
      isProcessing={isProcessing}
    />
  );
}
