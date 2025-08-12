// hooks/useWordFolders.ts
import { useEffect } from "react";
import { getfolders } from "../api/FolderAPI";

export function useWordFolders(wordId: number | null) {
  useEffect(() => {
    if (!wordId) return;
    (async () => {
      try {
        const list = await getfolders(wordId);
        console.log("getWordFolders:", list);
      } catch (e) {
        console.error("getWordFolders 실패", e);
      }
    })();
  }, [wordId]);
}
