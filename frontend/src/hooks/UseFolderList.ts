import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import { getWordFolders, type WordFolder } from "../api/GetWordFolders.ts";
import { getExistingWordFolders } from "../api/GetExistingWordFolders.ts";

export function useFolderListByWordId(enabled: boolean, wordId: number | null) {
  const [folders, setFolders] = useState<WordFolder[]>([]); // is_word_exist: false
  const [existingFolders, setExistingFolders] = useState<WordFolder[]>([]); // is_word_exist: true
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !wordId) return;
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [filteredFolders, trueFolders] = await Promise.all([
          getWordFolders(wordId),
          getExistingWordFolders(wordId),
        ]);

        if (!mounted) return;
        setFolders(filteredFolders);
        setExistingFolders(trueFolders);
      } catch (e) {
        const err = e as AxiosError<{ message?: string }>;
        if (!mounted) return;
        setError(
          err.response?.data?.message || err.message || "폴더 로딩 실패"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [enabled, wordId]);

  return { folders, existingFolders, loading, error };
}
