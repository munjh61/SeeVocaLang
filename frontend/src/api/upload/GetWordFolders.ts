import { authApi } from "../../utils/axios.ts";

export type WordFolder = {
  folderId: number;
  name: string;
  is_word_exist: boolean;
};

/**
 * 사용자가 단어를 저장할 수 있는 폴더 목록 조회
 * GET /api/v1/photos/words/{word_id}/folders
 * → is_word_exist: false 인 폴더만 반환
 */
export const getWordFolders = async (
  wordId: number | undefined
): Promise<WordFolder[]> => {
  try {
    const url = `/api/v1/photos/words/${wordId}/folders`;

    const res = await authApi.get(url);
    console.log("📁 API 원본 폴더 목록:", res.data?.content?.folders);

    const folders = (res.data?.content?.folders ?? []) as unknown[];

    const filtered = folders
      .filter(item => {
        if (typeof item === "object" && item !== null) {
          const f = item as Record<string, unknown>;
          return f.is_word_exist === false;
        }
        return false;
      })
      .map(item => {
        const f = item as Record<string, unknown>;
        return {
          folderId: Number(f.folderId ?? f.folder_id),
          name: String(f.name ?? ""),
          is_word_exist: Boolean(f.is_word_exist ?? f.isWordExist ?? false),
        };
      });

    console.log("📂 필터링된 저장 가능 폴더 목록:", filtered);

    return filtered;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ 폴더 목록 조회 실패:", error.message);
    } else {
      console.error("❌ 폴더 목록 조회 실패(알 수 없는 오류):", error);
    }
    return [];
  }
};

/**
 * 📌 이미 단어가 존재하는 폴더 목록 조회 (is_word_exist === true)
 */
export const getExistingWordFolders = async (
  wordId: number | undefined
): Promise<WordFolder[]> => {
  try {
    const url = `/api/v1/photos/words/${wordId}/folders`;
    const res = await authApi.get(url);
    console.log("📁 API 원본 폴더 목록:", res.data?.content?.folders);

    const folders = (res.data?.content?.folders ?? []) as unknown[];

    const filtered = folders
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
          is_word_exist: Boolean(f.is_word_exist ?? f.isWordExist ?? false),
        };
      });

    console.log("📂 단어가 이미 존재하는 폴더 목록:", filtered);

    return filtered;
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ 폴더 목록 조회 실패:", error.message);
    } else {
      console.error("❌ 폴더 목록 조회 실패(알 수 없는 오류):", error);
    }
    return [];
  }
};
