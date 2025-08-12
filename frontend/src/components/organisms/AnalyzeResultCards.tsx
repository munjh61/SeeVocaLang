import { Text } from "../atoms/text/Text.tsx";
import { Button } from "../atoms/button/Button.tsx";
import type { CardFolder } from "../../types/FileUploadType.ts";

// 재사용 배지
export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-50">
    {children}
  </span>
);

// 실패 카드
type AnalyzeFailCardProps = {
  onBack: () => void;
  onRetry: () => void;
  isRetrying?: boolean; // isAnalyzing
};
export const AnalyzeFailCard = ({
  onBack,
  onRetry,
  isRetrying,
}: AnalyzeFailCardProps) => (
  <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
    <div className="flex items-start gap-3">
      <div className="text-lg leading-none">⚠️</div>
      <div className="flex-1">
        <p className="font-semibold">분석에 실패했어요.</p>
        <p className="mt-1">
          이미지가 흐리거나 지원하지 않는 형식일 수 있어요. 다른 이미지를{" "}
          <b>다시 선택</b>하거나 동일 이미지로 <b>다시 분석</b>을 시도해 주세요.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <Button
            size="sm"
            bgColor="white"
            onClick={onBack}
            className={"border border-[#FF3245]"}
          >
            다시 선택
          </Button>
          <Button
            size="sm"
            bgColor="red"
            onClick={onRetry}
            disabled={isRetrying}
            textColor={"white"}
          >
            {isRetrying ? "분석 중..." : "다시 분석"}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// 중복/이미지 교체 카드
type DuplicateCardProps = {
  nameEn?: string | null;
  nameKo?: string | null;
  onBack: () => void;
  onReplace: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
};
export const DuplicateCard = ({
  nameEn,
  nameKo,
  onBack,
  onReplace,
  disabled,
  isProcessing,
}: DuplicateCardProps) => (
  <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-900">
    <div className="flex items-start gap-3">
      <div className="text-lg leading-none">🛈</div>
      <div className="flex-1">
        <p className="font-semibold">이미 동일한 단어가 있어요.</p>
        <p className="mt-1">
          이 이미지로 <b>기존 단어의 이미지만 교체</b>할 수 있습니다.
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge>EN: {nameEn ?? "-"}</Badge>
          <Badge>KO: {nameKo ?? "-"}</Badge>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 justify-end">
          <Button
            size="sm"
            bgColor="white"
            onClick={onBack}
            className={"border border-[#FFA600]"}
          >
            다시 선택
          </Button>
          <Button
            size="sm"
            bgColor="yellow"
            onClick={onReplace}
            disabled={disabled}
            textColor={"white"}
          >
            {isProcessing ? "교체 중..." : "이미지만 교체"}
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// 성공/신규 저장 카드
// ✅ SuccessCard: 멀티 선택 + 스크롤 + 체크박스 버전
type SuccessCardProps = {
  nameEn?: string | null;
  nameKo?: string | null;
  folders: CardFolder[]; // { folder_id, name }
  foldersLoading: boolean;
  foldersError: string | null;
  selectedFolderIds: number[]; // ✅ 단건 → 배열
  onChangeSelected: (ids: number[]) => void;
  onBack: () => void;
  onSave: (ids: number[]) => void; // ✅ 배열 전달
  disabled?: boolean; // 버튼 비활성화 전용
  isProcessing?: boolean;
};

export const SuccessCard = ({
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
}: SuccessCardProps) => {
  const toggle = (id: number) => {
    const next = selectedFolderIds.includes(id)
      ? selectedFolderIds.filter(x => x !== id)
      : [...selectedFolderIds, id];
    onChangeSelected(next);
  };

  return (
    <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900">
      <div className="flex items-start gap-3">
        <div className="text-lg leading-none">✅</div>
        <div className="flex-1">
          <p className="font-semibold">분석이 완료되었어요.</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge>EN: {nameEn ?? "-"}</Badge>
            <Badge>KO: {nameKo ?? "-"}</Badge>
          </div>

          <div className="mt-3">
            <Text size="sm" weight="bold" className="mb-2">
              저장할 단어장 (복수 선택)
            </Text>

            {foldersLoading ? (
              <p className="text-sm text-emerald-900/70">
                폴더를 불러오는 중...
              </p>
            ) : foldersError ? (
              <p className="text-sm text-red-600">{foldersError}</p>
            ) : folders.length === 0 ? (
              <p className="text-sm text-emerald-900/70">
                폴더가 없습니다. 먼저 단어장을 생성해 주세요.
              </p>
            ) : (
              <>
                {/* 약 5개 높이 → 스크롤 */}
                <ul className="max-h-48 overflow-y-auto rounded-lg border bg-white">
                  {folders.map(f => {
                    const checked = selectedFolderIds.includes(f.folder_id);
                    return (
                      <li
                        key={f.folder_id}
                        className="flex items-center gap-3 px-3 py-2 border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <input
                          id={`folder-${f.folder_id}`}
                          type="checkbox"
                          className="h-4 w-4"
                          checked={checked}
                          onChange={() => toggle(f.folder_id)}
                          // 체크박스는 항상 선택 가능(로딩/처리 중만 막음)
                          disabled={isProcessing || foldersLoading}
                        />
                        <label
                          htmlFor={`folder-${f.folder_id}`}
                          className="flex-1 cursor-pointer select-none"
                        >
                          {f.name}
                        </label>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-2 text-xs text-emerald-900/70">
                  {selectedFolderIds.length}개 선택됨
                </div>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 justify-end">
            <Button
              size="sm"
              bgColor="white"
              onClick={onBack}
              className="border border-[#6DC16A]"
            >
              다시 선택
            </Button>
            <Button
              size="sm"
              bgColor="green"
              onClick={() => onSave(selectedFolderIds)} // ✅ 배열 전달
              disabled={!!disabled}
              textColor={"white"}
            >
              {isProcessing ? "저장 중..." : "단어 저장"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
