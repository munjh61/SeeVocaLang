import React from "react";
import { Text } from "../atoms/text/Text.tsx";
import { TapePair } from "../organisms/mypage/Tape.tsx";

type StatItem = {
  label: React.ReactNode;
  value: React.ReactNode;
};

export function StatsNote({ items }: { items: StatItem[] }) {
  return (
    <li className="relative overflow-visible rounded-md bg-amber-50/70 border border-amber-200/60 px-3 py-2 shadow-sm">
      {/* 테이프: 좌우 끝 */}
      <TapePair
        size="xs"
        angleLeft={-45}
        angleRight={40}
        classNameLeft="-top-1 left-[-6px] h-2 w-6"
        classNameRight="-top-1 right-[-6px] h-2 w-6"
      />
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            <Text size="sm" color="gray" className="tracking-wide">
              {it.label}
            </Text>
            <Text size="sm" weight="medium" color="black" className="ml-auto">
              {it.value}
            </Text>
          </li>
        ))}
      </ul>
    </li>
  );
}
