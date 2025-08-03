import { useState, type ReactNode } from "react";
import { Button } from "../../atoms/button/Button";

type ToggleButton = {
  selected: boolean;
  children: ReactNode;
};

export const ToggleButton = ({ selected, children }: ToggleButton) => {
  const [isSelected, setIsSelected] = useState(selected);
  return (
    <Button
      textColor={isSelected ? "white" : "black"}
      bgColor={isSelected ? "purple" : "white"}
      className={"flex-wrap"}
      onClick={() => setIsSelected(prev => !prev)}
    >
      <span className="whitespace-nowrap">{children}</span>
    </Button>
  );
};
