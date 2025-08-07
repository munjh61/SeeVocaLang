type ProgressBarProps = {
  current: number;
  total: number;
  height: number;
  className?: string;
};

export const ProgressBar = ({ current, total, height }: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="flex items-center gap-1 w-full">
      <div className="w-full">
        <div
          className="w-full bg-gray-200 rounded-full overflow-hidden"
          style={{ height }}
        >
          {percentage > 0 && (
            <div
              className="bg-blue-500 transition-all duration-300"
              style={{
                width: `${percentage}%`,
                height: "100%",
              }}
            />
          )}
        </div>
      </div>
      <div className="text-xs text-gray-600 text-right font-bold">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};
