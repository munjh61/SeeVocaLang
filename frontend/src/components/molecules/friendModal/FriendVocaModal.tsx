import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { FriendModal } from "../../atoms/modal/friendmodal";
import { getWords } from "../../../api/FolderAPI";

type FriendVocaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folders: { folderId: number; name: string; description?: string }[];
};

type Word = { wordId?: number; imageUrl?: string; nameEn?: string; nameKo?: string };

export const FriendVocaModal = ({ isOpen, onClose, folders }: FriendVocaModalProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFolderClick = async (folderId: number, folderName: string) => {
    if (selectedFolderId === folderId) return;
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
    setLoading(true);
    try {
      const list = await getWords(folderId);
      setWords(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("단어 불러오기 실패:", e);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FriendModal isOpen={isOpen} onClose={onClose} zIndex={200} blurBackdrop>
      <div className="w-[min(92vw,900px)] max-h-[80vh] rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/10">
        {/* 헤더 */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-black/10">
          <h2 className="text-xl font-bold">
            {selectedFolderName ? `📂 ${selectedFolderName}` : "📚 단어장"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center rounded-full hover:bg-black/5 active:scale-95 transition"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        {/* 본문: 좌 폴더 / 우 단어 */}
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
          {/* 폴더 리스트 */}
          <aside className="p-4 border-b md:border-b-0 md:border-r border-black/10 max-h-[65vh] overflow-y-auto">
            <ul className="space-y-2">
              {folders.length ? (
                folders.map((f) => (
                  <li key={f.folderId}>
                    <button
                      onClick={() => handleFolderClick(f.folderId, f.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl ring-1 ring-black/10 hover:bg-black/5 transition
                        ${selectedFolderId === f.folderId ? "bg-black/5 ring-black/20 shadow-inner" : ""}`}
                      disabled={loading && selectedFolderId !== f.folderId}
                    >
                      <div className="font-medium truncate">{f.name}</div>
                      {f.description && <div className="text-xs text-black/60 truncate">{f.description}</div>}
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-black/60">단어장이 없습니다.</p>
              )}
            </ul>
          </aside>

          <main className="relative p-4 max-h-[65vh] overflow-y-auto" aria-busy={loading}>
            {/* 선택 전 안내 */}
            {selectedFolderId == null ? (
              <p className="text-sm text-black/60">왼쪽에서 단어장을 선택하세요.</p>
            ) : words.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {words.map((w) => (
                  <div
                    key={w.wordId ?? `${w.nameEn}-${w.nameKo}-${Math.random()}`}
                    className="flex items-center gap-3 p-3 rounded-xl ring-1 ring-black/10 bg-white"
                  >
                    {w.imageUrl ? (
                      <img
                        src={w.imageUrl}
                        alt={w.nameEn ?? ""}
                        className="w-12 h-12 rounded object-cover ring-1 ring-black/10"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-black/10 grid place-items-center text-xs text-black/60">
                        IMG
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{w.nameEn ?? "-"}</div>
                      <div className="text-sm text-black/60 truncate">{w.nameKo ?? "-"}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-black/60">단어가 없습니다.</p>
            )}

            {loading && (
              <div className="absolute inset-0 grid place-items-center bg-white/40 pointer-events-none">
                <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </main>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-black/10 bg-white">
          {selectedFolderName && (
            <Button
              bgColor="black"
              textColor="white"
              size="sm"
              onClick={() => {
                setSelectedFolderId(null);
                setSelectedFolderName("");
                setWords([]);
              }}
            >
              뒤로가기
            </Button>
          )}
          <Button bgColor="red" textColor="white" size="sm" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </FriendModal>
  );
};
