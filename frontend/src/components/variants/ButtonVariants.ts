import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded", // 이함수에 기본적으로 적용시킬 스타일 뼈대
  {
    variants: {
      purpose: {
        purple: `
          bg-gradient-to-r from-purple-700 to-blue-500
          hover:opacity-90
          active:scale-95 active:shadow-inner
        `,
        delete: "bg-red-500 text-white hover:bg-red-600",
        cancle: "bg-green-500 text-white hover:bg-green-600",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
      textColor: {
        white: "text-white",
        black: "text-black",
      },
    },
  }
);
