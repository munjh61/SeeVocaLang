/**
 * CalendarStatsCard
 * - 우측 카드: 캘린더(종이 프레임 + 테이프)와 학습 통계 3종 표시
 * - props:
 *   - days: 캘린더 표시용 문자열 배열
 *   - statistics: 통계 응답
 */

import WantedImg2 from "../../../asset/png/background/wanted_img2.png";
import { BgCard } from "../../molecules/BgCard";
import { StatsNote } from "../../molecules/StateNote";
import { CalendarCard } from "../../molecules/calendarCard/CalendarCard";
import type { StatisticsResponse } from "../../../api/MyPageApi";
import { TapePair } from "./Tape.tsx";

type Props = {
  days: string[];
  statistics: StatisticsResponse | null;
};

export function CalendarStatsCard({ days, statistics }: Props) {
  return (
    <BgCard
      src={WantedImg2}
      ratio={1}
      className="w-full"
      contentClassName="p-4 overflow-visible"
    >
      <div className="relative h-full w-full flex flex-col overflow-auto px-15 pb-5 pt-15">
        {/* 캘린더 프레임 */}
        <div className="relative mx-auto my-2 w-full md:max-w-[520px] overflow-visible z-[60]">
          <div className="relative -rotate-1 rounded-2xl border border-amber-200/70 bg-amber-50/70 p-3 md:p-4 shadow z-[60]">
            <div className="rounded-xl overflow-hidden ring-1 ring-amber-200 shadow-sm bg-white/30">
              <CalendarCard days={days} />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-[60]"
            >
              <TapePair
                size="md"
                classNameLeft="-top-1 -left-8"
                classNameRight="-top-1 -right-8"
                angleLeft={-35}
                angleRight={32}
              />
            </div>
          </div>
        </div>

        {/* 학습 통계 */}
        <ul className="mt-3 space-y-2 relative overflow-visible">
          <StatsNote
            items={[
              {
                label: "총 학습 일 수",
                value: statistics?.content.totalDaysCount || 0,
              },
            ]}
          />
          <StatsNote
            items={[
              {
                label: "현재 연속 학습 일 수",
                value: statistics?.content.monthDaysCount || 0,
              },
            ]}
          />
          <StatsNote
            items={[
              {
                label: "최대 연속 학습 일 수",
                value: statistics?.content.streakDaysCount || 0,
              },
            ]}
          />
        </ul>
      </div>
    </BgCard>
  );
}
