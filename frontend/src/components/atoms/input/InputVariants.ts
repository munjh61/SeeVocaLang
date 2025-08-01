import { cva } from "class-variance-authority";

export const InputVariants = cva(
  "w-full py-2 m-1 bg-white focus:outline-none transition-all",
  {
    variants: {
      scale: {
        sm: "text-sm rounded-sm px-6",
        md: "text-base rounded-md px-7",
        lg: "text-lg rounded-lg px-8",
        xl: "text-xl rounded-xl px-10",
      },
      bg: {
        white: "bg-white",
        black: "bg-black",
        gray: `bg-[#F3F4F6]`,
        red: "bg-[#FF3245]",
        orange: "bg-[#FF6940]",
        yellow: "bg-[#FFA600]",
        green: "bg-[#6DC16A]",
        blue: "bg-[#6083EE]",
        purple: "bg-[#9D5EEE]",
        noBg: `bg-transparent`,
      },
      text: {
        white: "text-white",
        black: "text-black",
        gray: "text-[#71717A]",
        red: "text-[#FF3245]",
        orange: "text-[#FF6940]",
        yellow: "text-[#FFA600]",
        green: "text-[#6DC16A]",
        blue: "text-[#6083EE]",
        purple: "text-[#9D5EEE]",
      },
      border: {
        none: "",
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
    },
    defaultVariants: {
      scale: "md",
      text: "black",
      border: "none",
      bg: "white",
    },
  }
);
