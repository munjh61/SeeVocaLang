import { authApi } from "../../utils/axios.ts";

export const UpdateWordImage = async (word_id: number, imageKey: string) => {
  const res = await authApi.put(`/api/v1/photos/words/${word_id}/image`, {
    imageKey,
  });
  console.log(
    "이미지 수정 응답 메시지 : ",
    res.data?.content?.msg ?? res.data?.message
  );
  return res.data?.content?.msg ?? (res.data?.message as string);
};
