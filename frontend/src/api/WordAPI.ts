import { type VocaCardProps } from "../components/organisms/vocaCard/VocaCard.tsx";
import { BASE_URL } from "../types/Regex.ts";
import { authApi } from "../utils/axios.ts";

const WordURL = `${BASE_URL}/api/v1/words`;

// 내 단어 전부 가져오기
export const getAllWords = async () => {
  try {
    const res = await authApi.get(WordURL);
    const words: VocaCardProps[] = res.data.content.map((w: VocaCardProps) => ({
      imgUrl: w.imgUrl,
      nameEn: w.nameEn,
      nameKo: w.nameKo,
      folders: w.folders,
    }));
    return words;
  } catch (error) {
    console.error("❌ 내 단어 전부 가져오기 요청 실패:", error);
    throw error;
  }
};

// 특정 단어 삭제
export const deleteWord = async (wordId: number) => {
  try {
    const res = await authApi.delete(`${WordURL}/${wordId}`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.data.response);
  } catch (error) {
    console.error("❌ 단어 삭제 요청 실패:", error);
    throw error;
  }
};
