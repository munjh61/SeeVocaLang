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
        // red: `bg-[#EF4444]`,
        // green: `bg-[#22C55E]`,
        // blue: `bg-[#3B82F6]`,
        // orange: `bg-[#F97316]`,
        white: "bg-white",
        black: "bg-black",
        gray: `bg-[#F3F4F6]`,
        pp: `bg -[#F1F6FE]`,
        red: "bg-[#FF3245]",
        orange: "bg-[#FF6940]",
        yellow: "bg-[#FFA600]",
        green: "bg-[#6DC16A]",
        blue: "bg-[#6083EE]",
        purple: "bg-[#9D5EEE]",
        noBg: `bg-transparent`,
        profileButton: `bg-[#613ECF]`
      },
      size: {
        xs: "px-2 py-0.5 text-xs font-light",
        sm: "px-2 py-1 text-xs font-normal",
        md: "px-4 py-1 text-xs font-medium",
        xxxl: "px-10 py-1 text-xxl font-bold",
        xl5: "px-25 py-1 text-xs",
        word: "px-30 py-30 text-xl",
        onboard: "w-80 h-12 text-lg",
        signup: "rounded-md w-100 h-12 text-lg",
        long: "px-50 py-1 text-xl"
      },
      textColor: {
        white: "text-white",
        black: "text-black",
        gray: "text-[#71717A]",
        pp: "text-[#8284E6]",
        red: "text-[#FF3245]",
        orange: "text-[#FF6940]",
        yellow: "text-[#FFA600]",
        green: "text-[#6DC16A]",
        blue: "text-[#6083EE]",
        purple: "text-[#9D5EEE]",
      },
      border: {
        white: "border border-white",
        black: "border border-black",
        gray: "border border-[#71717A]",
        red: "border border-[#FF3245]",
        orange: "border border-[#FF6940]",
        yellow: "border border-[#FFA600]",
        green: "border border-[#6DC16A]",
        blue: "border border-[#6083EE]",
        purple: "border border-[#9D5EEE]",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
      },
    },
  }
);
