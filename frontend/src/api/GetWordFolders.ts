import { authApi } from "../utils/axios.ts";

export type WordFolder = {
  folderId: number;
  name: string;
  isWordExist: boolean;
};

/**
 * 사용자가 단어를 저장할 수 있는 폴더 목록 조회
 * GET /api/v1/photos/words/{word_id}/folders
 */
export const getWordFolders = async (
  wordId: number | undefined
): Promise<WordFolder[]> => {
  try {
    const url = `/api/v1/photos/words/${wordId}/folders`;

    const res = await authApi.get(url);
    console.log("📁 단어 저장 가능 폴더 목록:", res.data?.content);

    const folders = (res.data?.content?.folders ?? []) as unknown[];

    return folders.map(item => {
      // 개별 요소가 객체인지 확인
      if (typeof item === "object" && item !== null) {
        const f = item as Record<string, unknown>;
        return {
          folderId: Number(f.folderId ?? f.folder_id),
          name: String(f.name ?? ""),
          isWordExist: Boolean(f.is_word_exist ?? f.isWordExist ?? false),
        };
      }
      // 타입이 맞지 않는 경우 기본값 반환
      return { folderId: 0, name: "", isWordExist: false };
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ 폴더 목록 조회 실패:", error.message);
    } else {
      console.error("❌ 폴더 목록 조회 실패(알 수 없는 오류):", error);
    }
    return [];
  }
};
