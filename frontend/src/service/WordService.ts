import type { AxiosError } from "axios";
import { WordImageUploadApi } from "../api/WordImageUploadApi.ts";

export async function replaceImage(
  wordId: number,
  folders: number[],
  imageKey: string
) {
  try {
    const msg = await WordImageUploadApi(wordId, folders, imageKey);
    return msg ?? "이미지가 성공적으로 수정되었습니다.";
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    throw new Error(
      err.response?.data?.message || err.message || "이미지 교체 실패"
    );
  }
}

// export async function saveWord(body: SaveRecognizedWordRequest) {
//   try {
//     const msg = await SaveRecognizedWordApi(body);
//     return msg ?? "단어가 저장되었습니다.";
//   } catch (e) {
//     const err = e as AxiosError<{ message?: string }>;
//     throw new Error(
//       err.response?.data?.message || err.message || "단어 저장 실패"
//     );
//   }
// }
