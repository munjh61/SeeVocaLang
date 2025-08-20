import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-10 h-10",
      xl: "w-15 h-15",
      searchbar: "w-8 h-8",
    },
    color: {
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
      pirate: "text-[#2b1e12]/80",
    },
    rotate: {
      none: "",
      left: "-rotate-90",
      right: "rotate-90",
      down: "rotate-180",
    },
  },
  defaultVariants: {
    size: "md",
    color: "black",
    rotate: "none",
  },
});
