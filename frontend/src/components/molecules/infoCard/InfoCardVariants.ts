import { cva } from "class-variance-authority";

export const infoCard = cva(
  "flex w-full items-center px-8 py-1.5 rounded-sm hover:opacity-90",
  {
    variants: {
      bgColor: {
        gradientPurple: `
          bg-gradient-to-r from-[#BA93F5] to-[#716BE9]
        `,
        gradientRed: `
          bg-gradient-to-r from-[#DE86B7] to-[#D15550]
        `,
        red: `
          bg-[#D0546C]
        `,
        blue:`
        bg-[#5960E2]
        `,
        green:`
        bg-[#5DA86B]
        `,
        white:`
        bg-[#F9FAFB]
        `
      },
      size: {
        lg: "px-2 py-1 text-xs",
        sm: "px-4 py-1 text-xs",
        progress: "px-30 py-1 text-xs",
      },
    },
  }
);
