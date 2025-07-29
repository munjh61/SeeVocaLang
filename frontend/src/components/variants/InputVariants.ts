import { cva } from "class-variance-authority";

export const InputVariants = cva(
  "w-full py-2 m-1 text-gray-500 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all",
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
      },
    },
    defaultVariants: {
      scale: "md",
    },
  }
);
