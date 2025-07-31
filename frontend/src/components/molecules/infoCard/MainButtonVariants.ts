import { cva } from "class-variance-authority";

export const mainPageButton = cva(
  "font-bold inline-flex items-center justify-center rounded-md hover:opacity-90 active:shadow-inner",
  {
    variants: {
      bgColor: {
        gradientPurple: `
          bg-gradient-to-r from-purple-700 to-blue-500
        `,
        gradientGreen: `
          bg-gradient-to-r from-green-300 to-green-700
        `,
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-1 text-xs",
        xl5: "px-30 py-1 text-xs",
        word: "px-30 py-30 text-xl",
      },
    },
  }
);
