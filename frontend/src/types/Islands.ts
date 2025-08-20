/**
 * Island(섬) 관련 타입 정의
 * - 캐러셀에서 사용되는 개별 섬의 데이터 구조와 동작 정의
 */

export type IslandKey = "snow" | "summer" | "candy";

/**
 * 섬 클릭 시 수행할 액션 타입
 * - modal: 모달을 열 때 (예: 파일 업로드)
 * - link: 특정 페이지로 이동
 */
export type IslandAction =
  | { type: "modal"; key: IslandKey }
  | { type: "link"; to: string };

/**
 * 캐러셀에 표시되는 개별 섬 데이터 구조
 */
export type Island = {
  key: IslandKey; // 섬 식별 키
  alt: string; // 접근성 텍스트 (이미지 설명)
  src: string; // 이미지 경로
  action: IslandAction; // 클릭 시 동작
  size?: number; // 개별 섬 크기 조정 (scale multiplier)
};

/**
 * 캐러셀 레이아웃 및 애니메이션 설정값
 */
export type CarouselConfig = {
  X_SPACING: number; // 좌우 간격(px)
  Z_STEP: number; // z축 깊이(px)
  SCALE_STEP: number; // 스케일 감소 비율
  BLUR_STEP: [number, number, number]; // blur 강도 (diff = 0, 1, 2+)
  CENTER_SCALE: number; // 중앙 아이템 추가 확대 배율
  FRAME_W: string; // 프레임 너비
  FRAME_H: string; // 프레임 높이
};
