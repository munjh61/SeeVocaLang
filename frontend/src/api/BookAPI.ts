import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const BooksURL = `${BASE_URL}/api/v1/folders`;

// 단어장 목록 불러오기
export const getBooks = async (userId: number) => {
  try {
    const response = await authApi.get(`${BooksURL}/${userId}`);
    return response.data.content;
  } catch (error) {
    console.error("error");
    throw error;
  }
};

// 단어장 생성
export const createBook = async (name: string, description: string) => {
  try {
    const response = await authApi.post(
      BooksURL,
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
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};

// 단어장 삭제
export const deleteBook = async (folderId: number) => {
  try {
    const response = await authApi.delete(`${BooksURL}/${folderId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};

// 단어장 수정
export const updateBook = async (
  folderId: number,
  name: string,
  description: string
) => {
  try {
    const response = await authApi.put(
      `${BooksURL}/${folderId}`,
      { name, description },
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(response.data.content);
    return response.data;
  } catch (error) {
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};

// 단어장 즐겨찾기
export const addFavorite = async (folderId: number) => {
  try {
    const res = await authApi.post(`${BooksURL}/${folderId}/favorite`);
    console.log(res.data);
  } catch (error) {
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};
export const delFavorite = async (folderId: number) => {
  try {
    const res = await authApi.delete(`${BooksURL}/${folderId}/favorite`);
    console.log(res.data);
  } catch (error) {
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};

// 단어장에 수록된 단어 가져오기
export const getWords = async (folderId: number) => {
  try {
    const res = await authApi.get(`${BooksURL}/${folderId}/words`);
    console.log("✅ words:", res?.data?.content);
    return res?.data?.content || [];
  } catch (error) {
    console.error("❌ 폴더 요청 실패:", error);
    throw error;
  }
};
