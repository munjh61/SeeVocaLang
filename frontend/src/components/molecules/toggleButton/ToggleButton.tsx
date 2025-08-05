import { useState, type ReactNode } from "react";
import { Button } from "../../atoms/button/Button";

type ToggleButton = {
  selected: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const ToggleButton = ({ selected, children, onClick }: ToggleButton) => {
  const [isSelected, setIsSelected] = useState(selected);
  return (
    <Button
      textColor={isSelected ? "white" : "purple"}
      bgColor={isSelected ? "purple" : "white"}
      border={isSelected ? "white" : "purple"}
      className={"flex-wrap p-2"}
      onClick={() => {
        onClick?.();
        setIsSelected(prev => !prev);
      }}
    >
      <span className="whitespace-nowrap">{children}</span>
    </Button>
  );
};
