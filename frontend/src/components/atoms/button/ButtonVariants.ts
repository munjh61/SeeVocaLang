import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "font-bold inline-flex items-center justify-center rounded-md hover:opacity-90 active:scale-95 active:shadow-inner cursor-pointer",
  {
    variants: {
      bgColor: {
        gradientPurple: `
          bg-gradient-to-r from-[#8197F2] to-[#9568EF]
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
        gray: `bg-[#F3F4F6]`,
        noBg: `bg-transparent`,
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-1 text-xs",
        xl5: "px-25 py-1 text-xs",
        word: "px-30 py-30 text-xl",
      },
      textColor: {
        white: "text-white",
        black: "text-black",
        purple: "text-[#9D5EEE]",
        gray: "text-[#71717A]",
      },
      rounded: {
        full: "rounded-full",
      },
    },
  }
);
