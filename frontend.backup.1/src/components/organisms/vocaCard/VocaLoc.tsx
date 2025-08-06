import type { VariantProps } from "class-variance-authority";
import { IconButton } from "../../molecules/iconButton/IconButton";
import type { buttonVariants } from "../../atoms/button/ButtonVariants";

type VocaLoc = {
  bg?: VariantProps<typeof buttonVariants>["bgColor"];
  folderId?: number;
  foldername?: string;
  children?: string;
};

export const VocaLoc = ({ bg, folderId, foldername, children }: VocaLoc) => {
  return (
    <IconButton
      ButtonVariant={{ bgColor: bg, textColor: "white" }}
      className="p-1 w-18 block"
      path={`/book/${folderId}`}
    >
      <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-light text-xs">
        {foldername}
        {children}
      </span>
    </IconButton>
  );
};
