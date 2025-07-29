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
      text: {
        black: "text-black",
        gray: "text-gray-500",
      },
    },
    defaultVariants: {
      scale: "md",
      text: "black",
    },
  }
);
