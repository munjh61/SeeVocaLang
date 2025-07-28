import { cva } from "class-variance-authority";

export const textVariants = cva(
  "inline-flex items-center justify-center rounded", // 이함수에 기본적으로 적용시킬 스타일 뼈대
  {
    variants: {
      style: {
        main: "bg-blue-500 text-white hover:bg-blue-600",
        game: "bg-red-500 text-white hover:bg-red-600",
        mypage: "bg-green-500 text-white hover:bg-green-600",
        friend: "bg-blue-500 radious-20",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      style: "main",
      size: "md",
    },
  }
);
