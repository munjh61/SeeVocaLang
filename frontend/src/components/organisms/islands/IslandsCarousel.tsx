import React, { useCallback, useMemo } from "react";
import { useCarousel } from "./useCarousel.ts";
import { DEFAULT_CAROUSEL_CONFIG, labelFor } from "./contants.ts";
import type { CarouselConfig, Island } from "../../../types/Islands.ts";
import { IslandCard } from "./IslandsCard.tsx";

type Props = {
  items: Island[];
  onSelect: (island: Island) => void;
  config?: Partial<CarouselConfig>;
};

export const IslandCarousel: React.FC<Props> = ({
  items,
  onSelect,
  config,
}) => {
  const cfg = { ...DEFAULT_CAROUSEL_CONFIG, ...config };
  const { setCurrent, prev, next, getDiff, calcPos, calcScale, centerItem } =
    useCarousel(items, cfg);

  /** 섬 클릭 시 동작 처리 */
  const handleSelect = useCallback(
    (island: Island, diff: number) => {
      if (diff === 0) onSelect(island);
      else setCurrent(items.findIndex(i => i.key === island.key));
    },
    [items, onSelect, setCurrent]
  );

  /** 현재/이전/다음 섬 계산 */
  const { prevItem, nextItem } = useMemo(() => {
    const ci = items.findIndex(i => i.key === centerItem.key);
    const prevIndex = (ci - 1 + items.length) % items.length;
    const nextIndex = (ci + 1) % items.length;
    return { prevItem: items[prevIndex], nextItem: items[nextIndex] };
  }, [items, centerItem]);

  return (
    <section
      className="
        grid place-content-center px-4
        min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]
        pt-6 md:pt-10 lg:pt-14
        pb-24 [padding-bottom:calc(6rem+env(safe-area-inset-bottom))]
        gap-10 sm:gap-12
      "
    >
      {/* 캐러셀 영역 */}
      <div
        className="
          relative mx-auto z-0
          h-[clamp(280px,45vh,480px)]
          w-full max-w-[1200px]
          overflow-visible
          [perspective:1000px] [transform-style:preserve-3d]
        "
        aria-roledescription="carousel"
      >
        <ul className="absolute inset-0 grid place-items-center overflow-visible">
          {items.map((island, i) => {
            const diff = getDiff(i);
            const posStyle = calcPos(diff);
            const scaleStyle = calcScale(diff, island.size ?? 1);

            return (
              <IslandCard
                key={island.key}
                island={island}
                diff={diff}
                frameW={cfg.FRAME_W}
                frameH={cfg.FRAME_H}
                posStyle={posStyle}
                scaleStyle={scaleStyle}
                onSelect={handleSelect}
                onMoveLeft={prev}
                onMoveRight={next}
              />
            );
          })}
        </ul>
      </div>

      {/* 중앙 라벨 + 이전/다음 미리보기 (섬을 살짝 가리도록 위로 당김) */}
      <div
        className="
          flex flex-col items-center gap-3 relative z-10
          -translate-y-4 sm:-translate-y-6 lg:-translate-y-10
        "
      >
        {/* 중앙 선택 라벨 */}
        <div
          className="
            inline-flex items-center gap-3
            rounded-full border border-black/5
            bg-white/90 backdrop-blur
            px-5 py-2 shadow-md
            text-xs sm:text-sm
          "
          aria-live="polite"
        >
          <span className="text-[12px] sm:text-[13px] px-3 py-2 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            현재 선택
          </span>
          <span className="font-semibold text-gray-800">
            {labelFor(centerItem)}
          </span>
        </div>

        {/* 이전/다음 정보 배지: 줄바꿈 허용 + 폭 제어 */}
        <div
          className="
            flex flex-wrap justify-center items-center gap-2
            relative z-10 bg-white/90 backdrop-blur
            rounded-full px-3 sm:px-5 py-2 shadow-md border border-black/5
            max-w-full
          "
        >
          <button
            type="button"
            onClick={prev}
            className="
              inline-flex items-center gap-2
              px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-green-200 bg-green-100
              text-xs sm:text-sm font-medium text-green-700 hover:bg-green-200 transition
              max-w-full
            "
            title={labelFor(prevItem)}
          >
            ← {labelFor(prevItem)}
          </button>

          <button
            type="button"
            onClick={next}
            className="
              inline-flex items-center gap-2
              px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-purple-200 bg-purple-100
              text-xs sm:text-sm font-medium text-purple-700 hover:bg-purple-200 transition
              max-w-full
            "
            title={labelFor(nextItem)}
          >
            {labelFor(nextItem)} →
          </button>
        </div>
      </div>
    </section>
  );
};
