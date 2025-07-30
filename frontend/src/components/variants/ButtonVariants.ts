import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "font-bold inline-flex items-center justify-center rounded-md hover:opacity-90 active:scale-95 active:shadow-inner",
  {
    variants: {
      bgColor: {
        gradientPurple: `
          bg-gradient-to-r from-purple-700 to-blue-500
        `,
        gradientGreen: `
          bg-gradient-to-r from-green-300 to-green-700
        `,
        gradientOrange: `
          bg-gradient-to-r from-orange-400 to-orange-700
        `,
        red: `
          bg-[#EF4444]
        `,
        green: `
          bg-[#22C55E]
        `,
        blue: `
          bg-[#3B82F6]
        `,
        orange: `
          bg-[#F97316]
        `,
        transparent: `
          bg-white/50 text-white
          hover:bg-white/40
          active:scale-95 active:shadow-inner
        `,
        white: `
          bg-white
        `,
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-1 text-xs",
        xl5: "px-30 py-1 text-xs",
        word: "px-30 py-30 text-xl",
      },
      textColor: {
        white: "text-white",
        black: "text-black",
        purple: "text-[#9564E6]",
      },
    },
  }
);
