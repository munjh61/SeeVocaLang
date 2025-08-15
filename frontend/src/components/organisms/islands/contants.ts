import SummerIslandImg from "../../../asset/png/island/summerIsland.png";
import CandyIslandImg from "../../../asset/png/island/candyIsland.png";
import SnowIslandImg from "../../../asset/png/island/snowIsland.png";
import type { CarouselConfig, Island } from "../../../types/Islands.ts";

/** 캐러셀 기본 설정값 */
/** 캐러셀 기본 설정값 */

export const DEFAULT_CAROUSEL_CONFIG: CarouselConfig = {
  /**
   * X축 간격(px) — 중앙에서 좌/우로 얼마나 떨어질지
   * 값 ↑ : 섬들이 더 좌우로 멀리 떨어짐
   * 값 ↓ : 섬들이 더 가까워져서 모임 (겹칠 수도 있음)
   */
  X_SPACING: 320,

  /**
   * Z축 깊이(px) — 중앙에서 멀어질수록 뒤로 밀리는 거리
   * 값 ↑ : 양옆 섬이 더 멀리 뒤로 가고 작아짐 (원근감↑)
   * 값 ↓ : 깊이감이 줄어들어 평면적으로 보임
   */
  Z_STEP: 130,

  /**
   * 스케일 감소 비율 — 중앙에서 한 칸 옆으로 갈 때 크기 줄어드는 정도
   * 값 ↑ : 중앙과 옆 섬 크기 차이가 큼 (중앙 강조↑)
   * 값 ↓ : 크기 차이가 줄어들어 평평해 보임
   */
  SCALE_STEP: 0.5,

  /**
   * 블러 강도(px) 배열 — [중앙, 한 칸 옆, 두 칸 이상] 순서
   * 값 ↑ : 해당 거리의 섬이 더 흐릿해짐 (중앙 집중↑)
   * 값 ↓ : 더 선명하게 보임
   */
  BLUR_STEP: [0, 0.5, 1.2],

  /**
   * 중앙 확대 배율 — 중앙 섬의 추가 확대 비율
   * 값 ↑ : 중앙 섬이 더 크고 강조됨
   * 값 ↓ : 중앙과 옆 섬 크기 차이가 줄어듦
   */
  CENTER_SCALE: 1.5,

  /**
   * 프레임 너비 — clamp(최소, 뷰포트비율, 최대) 형식
   * 화면 크기에 따라 자동 반응형 크기 조정
   */
  FRAME_W: "clamp(220px, 24vw, 320px)",

  /**
   * 프레임 높이 — clamp(최소, 뷰포트비율, 최대) 형식
   * FRAME_W와 비율이 안 맞으면 납작/길쭉해질 수 있음
   */
  FRAME_H: "clamp(150px, 24vw, 340px)",
};

/** 캐러셀에 표시할 섬 목록 */
// constants.ts (혹은 islands/constants.ts)
export const ISLANDS: Island[] = [
  {
    key: "snow",
    alt: "겨울섬(업로드)",
    src: SnowIslandImg,
    action: { type: "modal", key: "snow" },
    size: 1.1,
  },
  {
    key: "summer",
    alt: "야자수섬",
    src: SummerIslandImg,
    action: { type: "link", to: "/folder/0" },
    size: 0.95,
  },
  {
    key: "candy",
    alt: "사탕섬",
    src: CandyIslandImg,
    action: { type: "link", to: "/quiz/0" },
    size: 1.0,
  },
];

/**
 * 섬 라벨 생성
 * - alt에서 괄호 내용 제거 후 액션 이름을 붙임
 */
export function labelFor(island: Island) {
  const action =
    island.key === "snow"
      ? "사진 업로드"
      : island.key === "summer"
        ? "학습 단어"
        : island.key === "candy"
          ? "문제풀이"
          : undefined;
  const base = island.alt.replace(/\(.*?\)/g, "");
  return action ? `${base} • ${action}` : base;
}
