import type { WordFolder } from "./GetWordFolders.ts";
import { authApi } from "../utils/axios.ts";

export const getExistingWordFolders = async (
  wordId: number
): Promise<WordFolder[]> => {
  const url = `/api/v1/photos/words/${wordId}/folders`;

  const res = await authApi.get(url);
  const folders = (res.data?.content?.folders ?? []) as unknown[];

  return folders
    .filter(item => {
      if (typeof item === "object" && item !== null) {
        const f = item as Record<string, unknown>;
        return f.is_word_exist === true;
      }
      return false;
    })
    .map(item => {
      const f = item as Record<string, unknown>;
      return {
        folderId: Number(f.folderId ?? f.folder_id),
        name: String(f.name ?? ""),
        is_word_exist: true,
      };
    });
};
