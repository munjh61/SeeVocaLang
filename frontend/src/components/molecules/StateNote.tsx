import { Text } from "../atoms/text/Text.tsx";

export function StatsNote({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <li className="relative overflow-visible rounded-md bg-amber-50/70 border border-amber-200/60 px-3 py-2 shadow-sm">
      {/* 테이프: 좌우 끝 */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 left-[-6px] h-2 w-12 rounded-[2px] bg-yellow-200/80 border border-yellow-300/60 shadow
                   rotate-[-3deg]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 right-[-6px] h-2 w-12 rounded-[2px] bg-yellow-200/80 border border-yellow-300/60 shadow
                   rotate-[3deg]"
      />
      <div className="flex items-center gap-2">
        <Text size="sm" color="gray" className="tracking-wide">
          {label}
        </Text>
        <Text size="sm" weight="medium" color="black" className="ml-auto">
          {value}
        </Text>
      </div>
    </li>
  );
}
