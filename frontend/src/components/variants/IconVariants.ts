import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-30 h-30",
    },
    color: {
      gray: "text-gray-500",
      red: "text-red-500",
      white: "text-white",
      black: "text-black",
      blue: "text-blue-500",
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
