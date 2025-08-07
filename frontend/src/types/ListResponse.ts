// 목록 응답 래퍼 (response.data.content 형태를 제네릭으로 표현)
export type ListResponse<T> = {
  content: T;
  // 필요하면 pageable, totalElements 등 추가
};
