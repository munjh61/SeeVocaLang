type Props = {
  align?: "left" | "right";
  title: string;
  subtitle?: string;
  desc: string;
  className?: string;
};

export default function IntroCard({
  align = "left",
  title,
  subtitle,
  desc,
  className,
}: Props) {
  return (
    <div
      className={[
        // 📌 더 이상 고정 폭 제한 없음
        "w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]",
        "p-4 sm:p-6 lg:p-8",
        "rounded-2xl shadow-xl border",
        "backdrop-blur bg-white/70 border-white/40",
        align === "right" ? "ml-auto" : "mr-auto",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs sm:text-sm px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
          SVL
        </span>
        {subtitle && (
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            {subtitle}
          </span>
        )}
      </div>
      {/* 📌 반응형 타이틀 크기 */}
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      {/* 📌 반응형 설명 글자 크기 & 행간 */}
      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
