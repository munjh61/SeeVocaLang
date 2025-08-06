import { cva } from "class-variance-authority";

export const NavVariants = cva("", {
  variants: {
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
  },
});
