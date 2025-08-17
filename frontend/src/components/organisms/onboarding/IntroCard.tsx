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
        // ✅ 끝선 통일: 반응형 고정 폭 (필요시 수치만 조정)
        "flex-none basis-[28rem] sm:basis-[32rem] md:basis-[36rem] lg:basis-[40rem]",
        "rounded-2xl shadow-xl border",
        "backdrop-blur bg-white/70 border-white/40",
        // 바깥 여백은 정렬만 담당 (translate/margin으로 밀지 않음)
        align === "right" ? "ml-auto" : "mr-auto",
        // 내용 여백(대칭)
        "px-5 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8",
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

      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
