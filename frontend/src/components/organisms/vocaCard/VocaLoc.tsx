import type { VariantProps } from "class-variance-authority";
import { Button } from "../../atoms/button/Button";

type VocaLoc = {
  bg?: VariantProps<typeof Button>["bgColor"];
  children?: string;
};

export const VocaLoc = ({ bg, children }: VocaLoc) => {
  return (
    <Button textColor={"white"} bgColor={bg} className="p-1 w-15">
      <span className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-light text-xs">
        {children}
      </span>
    </Button>
  );
};
