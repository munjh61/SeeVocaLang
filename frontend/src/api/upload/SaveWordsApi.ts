// 응답 타입 정의
export type FolderInfo = {
  folder_id: number;
  name: string;
};

export type SaveWordsResponse = {
  message: string;
  content: {
    word_id: number;
    name_en: string;
    name_ko: string;
    image_url: string;
    folders: FolderInfo[];
  };
};

import { authApi } from "../../utils/axios.ts";

export const saveWordsApi = async (
  name_en: string,
  name_ko: string,
  image_key: string,
  folders: number[]
): Promise<SaveWordsResponse> => {
  try {
    const url = `/api/v1/photos/words`;
    const res = await authApi.post<SaveWordsResponse>(url, {
      name_en,
      name_ko,
      image_key,
      folders,
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("saveWordsApi 실패:", error);
    throw error;
  }
};
