import { cva } from "class-variance-authority";

export const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      xxl: "text-2xl",
      xxxl: "text-3xl",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    color: {
      primary: "text-blue-600",
      danger: "text-red-500",
      muted: "text-gray-500",
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
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    onlyOneLine: {
      yes: "w-full whitespace-nowrap overflow-hidden text-ellipsis",
      no: "",
    },
    font: {
      default: "", // Tailwind 기본 폰트
      outline: "font-sds-outline",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "black",
    onlyOneLine: "no",
  },
});
