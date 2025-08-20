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
        // 모바일
        "w-full max-w-[20rem] sm:max-w-[24rem]",
        // md부터
        "md:w-auto md:max-w-none md:flex-none md:flex-[0_0_28rem]",
        // lg
        "lg:w-auto lg:max-w-none lg:flex-[0_0_60rem]",
        // xl
        "xl:flex-[0_0_66rem]",
        // 스타일
        "rounded-2xl shadow-xl border",
        "backdrop-blur bg-white/70 border-white/40",
        align === "right" ? "ml-auto" : "mr-auto",
        // 패딩
        "px-5 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10",
        // 텍스트 줄바꿈 안전
        "break-words min-w-0",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-3 lg:mb-4">
        <span className="text-xs sm:text-sm lg:text-base px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
          SVL
        </span>
        {subtitle && (
          <span className="text-xs sm:text-sm lg:text-base text-gray-500 font-medium">
            {subtitle}
          </span>
        )}
      </div>

      <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-4">
        {title}
      </h3>

      <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
