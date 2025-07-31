import { cva } from "class-variance-authority";

export const infoCard = cva(
  "flex flex-col w-full justify-center items-center py-1 gap-0.1 rounded-sm hover:opacity-90",
  {
    variants: {
      bgColor: {
        gradientPurple: `
          bg-gradient-to-r from-[#BA93F5] to-[#716BE9]
        `,
        gradientRed: `
          bg-gradient-to-r from-[#DE86B7] to-[#D15550]
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
