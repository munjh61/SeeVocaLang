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
        "max-w-xl w-[92vw] sm:w-[560px] rounded-2xl shadow-xl border p-6",
        "backdrop-blur bg-white/70 border-white/40",
        align === "right" ? "ml-auto" : "mr-auto",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
          SVL
        </span>
        {subtitle && (
          <span className="text-xs text-gray-500 font-medium">{subtitle}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}
