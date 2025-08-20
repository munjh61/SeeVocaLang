import BinoRun from "../../../asset/png/bino_run.png";

type ProgressBarProps = {
  current: number;
  total: number;
  height: number;
  className?: string;
  percentageView?: boolean;
};

export const ProgressBar = ({
  current,
  total,
  height,
  className,
  percentageView = true,
}: ProgressBarProps) => {
  const percentage =
    total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  const imgHeight = Math.max(height * 1.4, 40); // 필요시 조정

  return (
    <div className={`flex items-center gap-1 w-full ${className ?? ""}`}>
      <div className="relative w-full">
        <div
          className="w-full bg-gray-200 rounded-full overflow-hidden"
          style={{ height }}
        >
          {percentage > 0 && (
            <div
              className="bg-blue-500 transition-all duration-300"
              style={{ width: `${percentage}%`, height: "100%" }}
            />
          )}
        </div>

        <img
          src={BinoRun}
          alt="BinoRun"
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none select-none"
          style={{
            left: `${percentage}%`,
            height: imgHeight,
          }}
          draggable={false}
        />
      </div>

      {percentageView && (
        <div className="text-xs text-gray-600  font-bold min-w-[2.5rem] text-end">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};
