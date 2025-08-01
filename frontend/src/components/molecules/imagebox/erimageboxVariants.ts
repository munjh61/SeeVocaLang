import { cva } from "class-variance-authority";

export const imageboxVariants = cva("", {
  variants: {
    shape: {
      square: "",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    shape: "square",
  },
});
