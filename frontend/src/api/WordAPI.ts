import { type VocaCardProps } from "../components/organisms/vocaCard/VocaCard.tsx";
import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const WordURL = `${BASE_URL}/api/v1/words`;

// 내 단어 전부 가져오기
export const getAllWords = async () => {
  try {
    const res = await authApi.get(WordURL);
    const words: VocaCardProps[] = res.data.content.map((w: VocaCardProps) => ({
      imageUrl: w.imageUrl,
      nameEn: w.nameEn,
      nameKo: w.nameKo,
      folders: w.folders,
    }));
    // console.log(words);
    return words;
  } catch (error) {
    console.error("❌ 내 단어 전부 가져오기 요청 실패:", error);
    throw error;
  }
};

// 모든 단어장에서 특정 단어 삭제
export const deleteWordAtAllFolder = async (wordId: number) => {
  try {
    const res = await authApi.delete(`${WordURL}/${wordId}`, {
      headers: { "Content-Type": "application/json" },
    });
    // console.log(res.data.message);
    return res.data.message;
  } catch (error) {
    console.error("❌ 단어 삭제 요청 실패:", error);
    throw error;
  }
};
