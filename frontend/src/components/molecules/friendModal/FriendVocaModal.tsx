import { useState } from "react";
import { Button } from "../../atoms/button/Button";
import { getWords } from "../../../api/FolderAPI"; // 📌 실제 경로 확인

type FriendVocaModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folders: { folderId: number; name: string; description: string }[];
};

export const FriendVocaModal = ({ isOpen, onClose, folders }: FriendVocaModalProps) => {
  const [words, setWords] = useState<
  { wordId?: number; imageUrl?: string; nameEn?: string; nameKo?: string }[]
>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFolderClick = async (folderId: number, folderName: string) => {
    setLoading(true);
    try {
      const wordList = await getWords(folderId);
      setWords(wordList);
      setSelectedFolderName(folderName);
    } catch (error) {
      console.error("단어 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[750px] max-h-[85vh] flex flex-col">
        {/* 제목 */}
        <h2 className="text-xl font-bold mb-4">
          {selectedFolderName ? `📂 ${selectedFolderName}` : "📚 단어장 목록"}
        </h2>

        {/* 단어장 목록 */}
        {!selectedFolderName && (
          <div className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
            {folders.length > 0 ? (
              folders.map((folder) => (
                <Button
                  key={folder.folderId}
                  bgColor="gray"
                  textColor="black"
                  size="md"
                  className="w-full justify-start"
                  onClick={() => handleFolderClick(folder.folderId, folder.name)}
                  disabled={loading}
                >
                  {folder.name}
                </Button>
              ))
            ) : (
              <p className="text-sm text-gray-500">단어장이 없습니다.</p>
            )}
          </div>
        )}

        {/* 단어 목록 */}
        {selectedFolderName && (
          <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
            {words.length > 0 ? (
              words.map((word) => (
                <div
                  key={word.wordId}
                  className="flex items-center gap-4 p-2 border rounded-lg"
                >
                  {word.imageUrl && (
                    <img
                      src={word.imageUrl}
                      alt={word.nameEn}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold">{word.nameEn}</span>
                    <span className="text-gray-600">{word.nameKo}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">단어가 없습니다.</p>
            )}
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="mt-4 flex justify-end gap-2">
          {selectedFolderName && (
            <Button
              bgColor="gray"
              textColor="white"
              size="sm"
              onClick={() => {
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
    </div>
  );
};
