import type { VariantProps } from "class-variance-authority";
import { IconButton } from "../../molecules/iconButton/IconButton";
import type { buttonVariants } from "../../atoms/button/ButtonVariants";

type VocaLoc = {
  bg?: VariantProps<typeof buttonVariants>["bgColor"];
  folderId: number;
  name?: string;
};

export const VocaLoc = ({ bg, folderId, name }: VocaLoc) => {
  return (
    <IconButton
      ButtonVariant={{ bgColor: bg, textColor: "white" }}
      className="p-1 w-23 block"
      path={`/folder/${folderId}`}
      state={{ name }}
    >
      <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-light text-xs">
        {name}
      </span>
    </IconButton>
  );
};
