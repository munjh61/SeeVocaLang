import { useMemo, useState, useCallback, useLayoutEffect } from "react";
import type { CarouselConfig, Island } from "../../../types/Islands.ts";
/** 인덱스를 순환시켜주는 유틸 */
const mod = (n: number, m: number) => ((n % m) + m) % m;

export function useCarousel(items: Island[], cfg: CarouselConfig) {
  /** 현재 중앙에 표시되는 섬 인덱스 */
  const [current, setCurrent] = useState(0);

  /**
   * ===== 반응형 스케일링 =====
   * - vw(뷰포트 너비)를 관찰해서 s(0.6~1.0) 스케일을 계산
   * - 작은 화면일수록 s가 작아져 간격/깊이/과도한 확대를 완화
   */
  const [vw, setVw] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useLayoutEffect(() => {
    // 뷰포트 리사이즈 반영
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    // 첫 렌더 시에도 한 번 동기화
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 360~1200px를 기준으로 0.6~1.0 스케일 매핑
  const s = useMemo(() => {
    const minW = 360;
    const maxW = 1200;
    const clamped = Math.max(minW, Math.min(maxW, vw));
    return 0.6 + ((clamped - minW) / (maxW - minW)) * 0.4;
  }, [vw]);

  // 아주 작은 화면에서는 2D 모드로 (translateZ 제거)
  const is2D = s < 0.75;

  /**
   * 파생된 반응형 파라미터
   * - X_SPACING: 좌우 간격을 s에 비례해 축소
   * - Z_STEP: 깊이감도 s에 비례해 축소 (살짝 더 완화)
   * - SCALE_STEP: 크기 차이도 과하지 않도록 완화
   * - CENTER_SCALE: 중앙 강조 배율도 과장 완화
   */
  const RX = useMemo(() => Math.round(cfg.X_SPACING * s), [cfg.X_SPACING, s]);
  const RZ = useMemo(() => Math.round(cfg.Z_STEP * (0.9 * s)), [cfg.Z_STEP, s]);
  const RSCALE_STEP = useMemo(
    () => cfg.SCALE_STEP * (0.7 + 0.3 * s),
    [cfg.SCALE_STEP, s]
  );
  const RCENTER_SCALE = useMemo(
    () => 1 + (cfg.CENTER_SCALE - 1) * (0.85 + 0.15 * s),
    [cfg.CENTER_SCALE, s]
  );

  /** 이전 아이템으로 이동 */
  const prev = useCallback(
    () => setCurrent(c => mod(c - 1, items.length)),
    [items.length]
  );

  /** 다음 아이템으로 이동 */
  const next = useCallback(
    () => setCurrent(c => mod(c + 1, items.length)),
    [items.length]
  );

  /** 현재 인덱스 기준 상대 위치(diff) 계산 (인덱스 거리: -N ~ +N) */
  const getDiff = useCallback(
    (index: number) => {
      let diff = index - current;
      if (diff > items.length / 2) diff -= items.length;
      if (diff < -items.length / 2) diff += items.length;
      return diff;
    },
    [current, items.length]
  );

  /** X/Z축 위치 계산 (반응형 파라미터 사용) */
  const calcPos = useCallback(
    (diff: number) => {
      const d = Math.max(-3, Math.min(3, diff)); // 좌우 3칸까지 제한
      const abs = Math.abs(d);

      // 작은 화면에서는 깊이를 2단계까지만 제한해 과장 완화
      const depthSteps = Math.min(2, abs);
      const translateZ = is2D ? 0 : -depthSteps * RZ;

      return {
        transform: `translateX(${d * RX}px) translateZ(${translateZ}px)`,
        zIndex: 100 - abs,
        pointerEvents: abs >= 3 ? "none" : "auto",
        transition: "transform 300ms ease",
      } as React.CSSProperties;
    },
    [RX, RZ, is2D]
  );

  /** 스케일, 투명도, 블러 효과 계산 (반응형 파라미터 사용) */
  const calcScale = useCallback(
    (diff: number, itemSize = 1) => {
      const abs = Math.abs(diff);

      // 거리 기반 기본 스케일
      let scaleBase = 1 - abs * RSCALE_STEP;
      if (abs === 0) scaleBase *= RCENTER_SCALE; // 중앙 강조
      const scale = scaleBase * itemSize;

      // 시선 유도용 투명도/블러
      const opacity = 1 - abs * 0.18;
      const blur =
        abs === 0
          ? cfg.BLUR_STEP[0]
          : abs === 1
            ? cfg.BLUR_STEP[1]
            : cfg.BLUR_STEP[2];

      return {
        transform: `scale(${scale})`,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        transition:
          "transform 300ms ease, opacity 300ms ease, filter 300ms ease",
      } as React.CSSProperties;
    },
    [RSCALE_STEP, RCENTER_SCALE, cfg.BLUR_STEP]
  );

  /** 현재 중앙 섬 */
  const centerItem = useMemo(() => items[current], [items, current]);

  return {
    current,
    setCurrent,
    prev,
    next,
    getDiff,
    calcPos,
    calcScale,
    centerItem,
    config: cfg,
  };
}
