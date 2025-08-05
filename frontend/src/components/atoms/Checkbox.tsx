import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../../utils/cn.ts";

type CheckboxProps = {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onCheckedChange,
  className,
}) => {
  return (
    <CheckboxPrimitive.Root
      id={id}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "w-5 h-5 border border-gray-300 rounded-sm bg-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 flex items-center justify-center transition-colors",
        className
      )}
    >
      <CheckboxPrimitive.Indicator>
        <CheckIcon className="text-white w-4 h-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};
