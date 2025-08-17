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
    <section className="grid place-content-center px-4 min-h-[calc(83vh-64px)] gap-14">
      {/* 캐러셀 영역 */}
      <div
        className="
          relative mx-auto z-0
          h-[400px] sm:h-[480px] lg:h-[455px]
          w-full max-w-[1200px]
          [perspective:1000px] [transform-style:preserve-3d]
        "
        aria-roledescription="carousel"
      >
        <ul className="absolute inset-0 grid place-items-center">
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

      {/* 중앙 라벨 + 이전/다음 미리보기 */}
      <div className="flex flex-col items-center gap-2 relative z-10">
        {/* 중앙 선택 라벨 */}
        <div
          className="
            inline-flex items-center gap-4
            rounded-full border border-black/5
            bg-white/90 backdrop-blur
            px-8 py-2 shadow-md
          "
          aria-live="polite"
        >
          <span className="text-[13px] px-4 py-2.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            현재 선택
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {labelFor(centerItem)}
          </span>
        </div>

        {/* 이전/다음 정보 배지 */}
        <div className="flex items-center gap-4 relative z-10 bg-white/90 backdrop-blur rounded-full px-5 py-2 shadow-md border border-black/5">
          {/* 이전 섬 */}
          <button
            type="button"
            onClick={prev}
            className="
      inline-flex items-center gap-2
      px-6 py-3 rounded-full border border-green-200 bg-green-100
      text-xs font-medium text-green-700 hover:bg-green-200 transition
    "
            title={labelFor(prevItem)}
          >
            ← {labelFor(prevItem)}
          </button>

          {/* 다음 섬 */}
          <button
            type="button"
            onClick={next}
            className="
      inline-flex items-center gap-2
      px-6 py-3 rounded-full border border-purple-200 bg-purple-100
      text-xs font-medium text-purple-700 hover:bg-purple-200 transition
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
