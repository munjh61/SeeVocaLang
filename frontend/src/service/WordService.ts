// services/WordService.ts
import type { AxiosError } from "axios";
import { WordImageUploadApi } from "../api/upload/WordImageUploadApi.ts";
import { saveWordsApi } from "../api/upload/SaveWordsApi.ts";
import type { SaveWordsResponse } from "../api/upload/SaveWordsApi.ts";

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

export async function saveWords(
  name_en: string,
  name_ko: string,
  image_key: string,
  folders: number[]
): Promise<SaveWordsResponse> {
  try {
    const res = await saveWordsApi(name_en, name_ko, image_key, folders);
    return res; // { message, content: { word_id, name_en, ... , folders: [...] } }
  } catch (e) {
    const err = e as AxiosError<{ message?: string }>;
    throw new Error(
      err.response?.data?.message || err.message || "단어 저장 실패"
    );
  }
}
