import type { FolderProps } from "../components/organisms/folder/Folder.tsx";
import type { VocaCardProps } from "../components/organisms/vocaCard/VocaCard.tsx";
import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const foldersURL = `${BASE_URL}/api/v1/folders`;

// 단어장 목록 불러오기
export const getfolders = async (userId: number) => {
  try {
    const response = await authApi.get(`${foldersURL}/${userId}`);
    const folders: FolderProps[] = response.data.content.map(
      (b: FolderProps) => ({
        folderId: b.folderId,
        name: b.name,
        description: b.description ?? "",
        favorite: Boolean(b.favorite),
        thumbnailUrl: b.thumbnailUrl ?? null,
      })
    );
    return folders;
  } catch (error) {
    console.error("error");
    throw error;
  }
};

// 단어장 생성
export const createfolder = async (name: string, description: string) => {
  try {
    const response = await authApi.post(
      foldersURL,
      { name, description },
      { headers: { "Content-Type": "application/json" } }
    );
    const folderId = Number(response.data.content);
    return {
      folderId,
      name,
      description,
      thumbnailUrl: null,
      favorite: false,
    };
  } catch (error) {
    console.error("❌ 폴더 생성 요청 실패:", error);
    throw error;
  }
};

// 단어장 삭제
export const deletefolder = async (folderId: number) => {
  try {
    const response = await authApi.delete(`${foldersURL}/${folderId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 폴더 삭제 요청 실패:", error);
    throw error;
  }
};

// 단어장 수정
export const updatefolder = async (
  folderId: number,
  name: string,
  description: string
) => {
  try {
    const response = await authApi.put(
      `${foldersURL}/${folderId}`,
      { name, description },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("❌ 폴더 수정 요청 실패:", error);
    throw error;
  }
};

// 단어장 즐겨찾기
export const addFavorite = async (folderId: number) => {
  try {
    const res = await authApi.post(`${foldersURL}/${folderId}/favorites`);
    console.log(res.data);
  } catch (error) {
    console.error("❌ 폴더 즐겨찾기 추가 요청 실패:", error);
    throw error;
  }
};
export const deleteFavorite = async (folderId: number) => {
  try {
    const res = await authApi.delete(`${foldersURL}/${folderId}/favorites`);
    console.log(res.data);
  } catch (error) {
    console.error("❌ 폴더 즐겨찾기 삭제 요청 실패:", error);
    throw error;
  }
};

// 특정 단어장 수록 단어 가져오기
export const getWords = async (folderId: number) => {
  try {
    const res = await authApi.get(`${foldersURL}/${folderId}/words`);
    const words: VocaCardProps[] = res.data.content.map((w: VocaCardProps) => ({
      wordId: w.wordId,
      imageUrl: w.imageUrl,
      nameEn: w.nameEn,
      nameKo: w.nameKo,
      folders: w.folders,
    }));
    return words;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 특정 단어장에서 특정 단어 삭제
export const deleteWordAtThisFolder = async (
  wordId: number,
  folderId: number
) => {
  try {
    const res = await authApi.delete(
      `${foldersURL}/${folderId}/words/${wordId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(res.data.message);
  } catch (error) {
    console.error("❌ 단어 삭제 요청 실패:", error);
    throw error;
  }
};
